import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import styles from "./Dashboard.module.css";

import { Link, useNavigate } from "react-router-dom";
import { Stacked, Pie, Button, LineChart, SparkLine, Timeline1, ComplexTable } from "../../components";
import {
  earningData,
  stackedplot,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
  timelineData,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/context";
import { useGlobalContext } from "../../contexts/context2";
import money from "../../data/money.png";
import { Grid } from "@mui/material";



const Dashboard = () => {
  const { currentColor } = useStateContext();
  const cardColors = ["rgb(191, 240, 243)", "#ffe893", "#fad1d3", "#a2efb0"];
  const budget = 93438.23;
  const expense = 48487;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
          {earningData.map((item, index) => (
            <div
              key={item.title}
              className="col-md-4 bg-white h-auto dark:text-gray-200 dark:bg-secondary-dark-bg p-8 pt-9 rounded-2xl md:auto"
              style={{ backgroundColor: cardColors[index] }}
            >
              <div className="flex items-center mb-3">
                <button
                  type="button"
                  style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                  className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                <div className="ml-5 flex flex-col">
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">{item.amount}</p>
                    <p className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


        <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
          <div className="container mt-3">

            {/* Using Grid Approach */}
            <div className="col-md-6 col-12">
              <Grid container spacing={1}>
                <Grid item md={7} xs={12}>
                  <div className="bg-white h-auto dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-3 p-md-4 rounded-2xl flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <p className="font-semibold text-xl">Revenue Updates</p>
                    </div>
                    <div>
                      <SparkLine data={SparklineAreaData} color={currentColor} />
                    </div>
                  </div>
                </Grid>
                <Grid item md={5} xs={12}>
                  <div className="bg-white h-auto dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-3 p-md-4 rounded-2xl flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <p className="font-semibold text-xl">ComplexTable</p>
                    </div>
                    <div>
                      <ComplexTable height="100%"/>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
        </div>
      </div>

    <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
      <Grid container spacing={1} className="SecondHalf">
        <Grid item md={8} xs={12}>
          <div className="bg-white h-auto dark:text-gray-200 dark:bg-secondary-dark-bg m-2 p-4 rounded-2xl flex-grow-1">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Revenue Updates</p>
            </div>
            <div className="mt-5">
              <Stacked data={stackedplot} height={400} width={600} />
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className="bg-white h-auto dark:text-gray-200 dark:bg-secondary-dark-bg m-2 p-4 rounded-2xl flex-grow-1">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Timeline</p>
            </div>
            <div className="timeline-section text-m mt-5">
              <Timeline1 data={timelineData} height="100%" />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>

  </div>


  );
};

export default Dashboard;