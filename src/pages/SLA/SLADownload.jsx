import { Page, Document, Text, View, StyleSheet, Image, Font, PDFDownloadLink ,BlobProvider} from '@react-pdf/renderer';
import OpenSans1 from './open-sans-600.ttf';
import TopImage from "./Picture1.jpg";
import KaarLogo from "./kaarlogo.png";
import Plotly from "plotly.js-basic-dist";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

Font.register({
  family: 'Open Sans',
  src: OpenSans1,
});


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  pageContainer: {
    border: 2,
    borderColor: "#b30000",
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
  section: {
    margin: 5,
    padding: 5,
    alignSelf: "center",
  },
  Headertext: {
    fontFamily: "Open Sans",
    fontSize: 15,
    alignSelf: "center",
    padding: 5,
  },
  TopImage: {
    width: "100%",
    height: "auto",
  },
  ImageLine: {
    backgroundColor: "#b30000",
    height: 4,
    marginTop: 10,
  },
  KaarLogo: {
    width: "20%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
  },
  HeadingLine: {
    backgroundColor: "#b30000",
    height: 3,
    marginLeft: 25,
    marginRight: 25,
  },
  infoBox: {
    position: "absolute",
    backgroundColor: "#b30000",
    marginTop: 9,
    padding: 10,
    top: "99.99%", // Adjust the top position as needed
    left: 0,
    right: 0,
    border: 1,
    borderColor: "#b30000",
  },
  Footertext: {
    fontWeight: "bolder",
    fontSize: 10,
    color: "white",
  },
  TopLine: {
    backgroundColor: "#b30000",
    height: 3,
    marginLeft: 15,
    marginRight: 15,
  },
  PageOneText: {
    fontSize: 15,
    marginTop: 20,
  },
  BoldText: {
    fontFamily: "Open Sans",
    
    fontSize:10,
    padding:2
    
  },
  BoldText2: {
    fontFamily: "Open Sans",
    padding: 2,
    fontSize: 10,
  },
  PageTwoText: {
    fontSize: 14,
    margin: 5,
    marginTop: 20,
    fontFamily: "Open Sans",
    alignSelf: "center",
    padding: 5,
  },
  headerCell: {
    fontFamily: "Open Sans",
    alignSelf: "center",
    fontSize: 10,
    backgroundColor: '#333', 
    color: '#fff', 
    padding: 8,

  },
  headerCell2: {
    fontFamily: "Open Sans",
    alignSelf: "center",
    fontSize: 10,
    width: "20%",
    backgroundColor: '#333', 
    color: '#fff', 
    padding: 8,

  },
  cell: {
    fontFamily: "Open Sans",
    alignSelf: "center",
    fontSize: 8,
    padding: 8,
    backgroundColor: '#fff', 
  },
 
});











const MyDocument = (props) => {

  const accountName = 'customersladata';
  const containerName = 'testing';
  const sasToken = '?sp=racwdli&st=2023-10-05T10:36:54Z&se=2023-10-31T18:36:54Z&sv=2022-11-02&sr=c&sig=V1VC34TgY3dGRXpbOIrXgFBqD4KvrelL0ZTjmByqISc%3D';

  // console.log(props.row)
  
  const columns1 = [
    {label: "ID", dataKey: "id" },
    { label: "Host", dataKey: "Host" },
    { label: "Up", dataKey: "Up" },
    { label: "Down", dataKey: "Down" },
    { label: "Unreachable", dataKey: "Unreachable" },
  ]
  const columns2 = [
    {label: "ID", dataKey: "id" },
    { label: "Host", dataKey: "Host" },
    { label: "Services", dataKey: "Services" },
    { label: "Up", dataKey: "Up" },
    { label: "Down", dataKey: "Down" },
    { label: "Unreachable", dataKey: "Unreachable" },
  ]

  

  const splitRowsIntoSections = (rows) => {
    const sections = [];
    const rowsPerPage = 10; // Number of rows for the first page
    let currentIndex = 0;
  
    // Add rows for the first page
    sections.push(rows.slice(currentIndex, currentIndex + rowsPerPage));
    currentIndex += rowsPerPage;
  
    // Add rows for the subsequent pages (15 rows per page)
    while (currentIndex < rows.length) {
      sections.push(rows.slice(currentIndex, currentIndex + 18));
      currentIndex += 15;
    }
  console.log(sections)
    return sections;
  };

  const splitRowsIntoSections2 = (rows1) => {
    const sections2 = [];
    const rowsPerPage = 10; // Number of rows for the first page
    let currentIndex = 0;
  
    // Add rows for the first page
    sections2.push(rows1.slice(currentIndex, currentIndex + rowsPerPage));
    currentIndex += rowsPerPage;
  
    // Add rows for the subsequent pages (15 rows per page)
    while (currentIndex < rows1.length) {
      sections2.push(rows1.slice(currentIndex, currentIndex + 18));
      currentIndex += 15;
    }
    console.log(sections2)
  
    return sections2;
  };

  const calculateColumnWidths = (sections,columns1) => {

    const columnWidths = {};

 // Initialize columnWidths with default values

    columns1.forEach((column) => {

      columnWidths[column.dataKey] = column.label.length;

    });

  // Calculate the maximum width based on header and data values

    sections.forEach((section) => {

      section.forEach((row) => {

        columns1.forEach((column) => {

          const content = row[column.dataKey].toString();

          const contentWidth = content.length;

          const headerWidth = column.label.length;

          const maxWidth = Math.max(contentWidth, headerWidth);
         if (maxWidth > columnWidths[column.dataKey]) {

            columnWidths[column.dataKey] = maxWidth;

          }

        });

      });

    });

 

    return columnWidths;

  };

 

  
  
  const generateChartImage = () => {
    // Create a Plotly chart
    const data = [
      {
          values: [100 - props.row.HostAverageAvailability, props.row.HostAverageAvailability],
          labels: ['Unavailability', 'Availability'],
          type: 'pie'
      },
    ];
  
    const layout = {
      height: 600,
      width: 680
    };
  
    // Convert the Plotly chart to an image (PNG format)
    const chartImage = Plotly.toImage(
      { data, layout },
      { format: "png", width: 600, height: 400 }
    );
  
    return chartImage;
  };

  const generateChartImage2 = () => {
    // Create a Plotly chart
    const data = [
      {
          values: [100 - props.row.ServiceAverageAvailability, props.row.ServiceAverageAvailability],
          labels: ['Unavailability', 'Availability'],
          type: 'pie'
      },
    ];
  
    const layout = {
      height: 600,
      width: 680
    };
  
    // Convert the Plotly chart to an image (PNG format)
    const chartImage = Plotly.toImage(
      { data, layout },
      { format: "png", width: 600, height: 400 }
    );
  
    return chartImage;
  };

  const chartImage = generateChartImage();
  const chartImage2 = generateChartImage2();
  let slicedSARows=props.row.SARows
  let slicedHARows=props.row.HARows
  console.log(props.row.customer)
  // if(props.row.customer==="Tanmaiah"){
  //   slicedSARows = props.row.SARows.slice(0, -2);
  //   slicedHARows = props.row.HARows.slice(0,-11);
  //   console.log('-------------')
  //   console.log(slicedSARows)
  //   console.log(slicedHARows)
  // }
  const sections = splitRowsIntoSections(slicedSARows);
  const sections2 = splitRowsIntoSections2(slicedHARows);

  const columnWidth1 = calculateColumnWidths(sections2,columns1);
  const columnWidth2 = calculateColumnWidths(sections,columns2);
  
  return (
  <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.pageContainer}>
                <Image src={TopImage} style={styles.TopImage} />
                <View style={styles.ImageLine} />
                <Image src={KaarLogo} style={styles.KaarLogo} />
                <View style={styles.HeadingLine} />
                <View style={styles.section}>
                  <Text style={styles.Headertext}>
                    {props.row.customer} - SLA Report 
                  </Text>
                  <Text style={styles.Headertext}>
                    {props.row.titleCard}
                  </Text>
                </View>
                <View style={styles.HeadingLine} />
                <View style={styles.infoBox}>
                  <Text style={styles.Footertext}>@KaarTechnologies</Text>
                </View>
              </View>
            </Page>

            {sections2.map((section, index) => (
              <Page key={index} size="A4" style={styles.page}>
                <View
                  style={
                    index === 0 ? styles.pageContainer : styles.pageContainer
                  }
                >
                  {index === 0 && (
                    <View>
                      <View style={styles.TopLine} />
                      <View style={styles.section}>
                        <Text style={styles.PageTwoText}>
                        
                            SERVER AVAILABILITY
                         
                         
                        </Text >
                        <Text style={styles.BoldText}>
                        (Report covers from {props.row.fromData.split(' GMT')[0]} to {props.row.toDate.split(' GMT')[0]})
                        </Text>
                      </View>
                      <View style={{marginLeft:100}}>
                        <Text>
                          <Text style={{alignContent:"center"}} >
                            <Image
                              src={chartImage}
                              style={{ width: 350, height: 350}}
                            />
                          </Text>
                          {/* <Text style={{ flex: 1 }}>
                            <Image
                              src={chartImage}
                              style={{ width: 250, height: 250 }}
                            />
                          </Text> */}
                        </Text>
                      </View>
                    </View>
                  )}
                  <View wrap style={{
    marginTop: index === 0 ? -50 : 0 // Replace 'condition' with your actual condition
  }}>
                    <Table data={section}>
                      <TableHeader>
                        {columns1.map((header) => (
                          <TableCell
                          weighting={columnWidth1[header.dataKey]}
                            style={styles.headerCell}
                            key={header.dataKey}
                          >
                            {header.label}
                          </TableCell>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {columns1.map((header) => (
                          <DataTableCell
                            weighting={columnWidth1[header.dataKey]}
                            style={styles.cell}
                            key={header.dataKey}
                            getContent={(r) => r[header.dataKey]}
                          />
                        ))}
                      </TableBody>
                    </Table>
                   
                  </View>
                {index === sections2.length-1 &&  <Text style={styles.BoldText2}>
                           Average : {props.row.HostAverageAvailability.toFixed(2)}%
                    </Text>}
                </View>
              </Page>
            ))}
            {sections.map((section, index) => (
              <Page key={index} size="A4" style={styles.page}>
                <View
                  style={
                    index === 0 ? styles.pageContainer : styles.pageContainer
                  }
                >
                  {index === 0 && (
                    <View>
                      <View style={styles.TopLine} />
                      <View style={styles.section}>
                      <Text style={styles.PageTwoText}>
                        
                        APPLICATION SERVICES AVAILABILITY
                     
                     
                    </Text >
                    <Text style={styles.BoldText}>
                    (Report covers from {props.row.fromData.split(' GMT')[0]} to {props.row.toDate.split(' GMT')[0]})
                    </Text>
                      </View>
                      <View style={{marginLeft:100}}>
                        <Text >
                          <Text>
                            <Image
                              src={chartImage2}
                              style={{ width: 350, height: 350,}}
                            ></Image>
                          </Text>
                          {/* <Text style={{ flex: 1 }}>
                            <Image
                              src={chartImage2}
                              style={{ width: 250, height: 250 }}
                            ></Image>
                          </Text> */}
                        </Text>
                      </View>
                    </View>
                  )}
                  <View wrap style={{
    marginTop: index === 0 ? -50 : 0 // Replace 'condition' with your actual condition
  }}>
                    <Table data={section}>
                      <TableHeader>
                        {columns2.map((header) => (
                          <TableCell
                            style={header.label==='Services'?styles.headerCell2:styles.headerCell}
                            weighting={columnWidth2[header.dataKey]}
                            key={header.dataKey}
                          >
                            {header.label}
                          </TableCell>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {columns2.map((header) => (
                          <DataTableCell
                            weighting={columnWidth2[header.dataKey]}
                            style={styles.cell}
                            key={header.dataKey}
                            getContent={(r) => r[header.dataKey]}
                          />
                        ))}
                      </TableBody>
                    </Table>
                    
                  </View>
                  {index === sections.length-1 &&<Text style={styles.BoldText2}>
                           Average : {props.row.ServiceAverageAvailability.toFixed(2)}%
                    </Text>}
                </View>
              
              </Page>
            ))}

          </Document>
)
 }

export default MyDocument