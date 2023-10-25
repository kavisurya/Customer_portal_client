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
    alignSelf: "center",
    padding: 5,
  },
  PageTwoText: {
    fontSize: 14,
    margin: 5,
    marginTop: 20,
  },
  table: {
    
    backgroundColor: 'white', 
  },
  headerCell: {
    fontFamily: "Open Sans",
    alignSelf: "center",
    fontSize: 10,
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
    // console.log(sections2)
  
    return sections2;
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
                  {/* <Text style={styles.Headertext}>
                    {props.row.customer}
                  </Text> */}
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
                          <Text style={styles.BoldText}>
                            SERVER AVAILABILITY
                          </Text>{" "}
                          (Report covers from 01/09/2023 - 30/09/2023)
                        </Text>
                      </View>
                      <View>
                        <Text>
                          <Text style={{alignContent:"center"}} >
                            <Image
                              src={chartImage}
                              style={{ width: 300, height: 300 }}
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
                  <View wrap style={styles.table}>
                    <Table data={section}>
                      <TableHeader>
                        {columns1.map((header) => (
                          <TableCell
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
                            style={styles.cell}
                            key={header.dataKey}
                            getContent={(r) => r[header.dataKey]}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </View>
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
                          <Text style={styles.BoldText}>
                            APPLICATION SERVICES AVAILABILITY
                          </Text>{" "}
                          (Report covers from 01/09/2023 - 30/09/2023)
                        </Text>
                      </View>
                      <View>
                        <Text >
                          <Text>
                            <Image
                              src={chartImage2}
                              style={{ width: 300, height: 300,marginLeft:'50px' }}
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
                  <View wrap style={styles.table}>
                    <Table data={section}>
                      <TableHeader>
                        {columns2.map((header) => (
                          <TableCell
                            style={styles.headerCell}
                            key={header.dataKey}
                          >
                            {header.label}
                          </TableCell>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {columns2.map((header) => (
                          <DataTableCell
                            style={styles.cell}
                            key={header.dataKey}
                            getContent={(r) => r[header.dataKey]}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </View>
                </View>
              </Page>
            ))}

          </Document>
)
 }

export default MyDocument