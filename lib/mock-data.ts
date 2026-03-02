import { ReportData } from "@/types";

export const mockReportData: ReportData = {
  productName: "Notion",
  timelineData: [
    { date: "2018-01", value: 1000, metricType: "MAU" },
    { date: "2018-06", value: 5000, metricType: "MAU" },
    { date: "2019-01", value: 15000, metricType: "MAU" },
    { date: "2019-06", value: 30000, metricType: "MAU" },
    { date: "2020-01", value: 60000, metricType: "MAU" },
    { date: "2020-06", value: 120000, metricType: "MAU" },
    { date: "2021-01", value: 250000, metricType: "MAU" },
    { date: "2021-06", value: 500000, metricType: "MAU" },
    { date: "2022-01", value: 1000000, metricType: "MAU" }
  ],
  keyEvents: [
    { 
      date: "2018-03", 
      eventType: "Product Launch", 
      description: "Notion launched publicly with core note-taking features", 
      impactScore: 0.8 
    },
    { 
      date: "2019-08", 
      eventType: "Funding Round", 
      description: "Raised $50M Series B led by Index Ventures", 
      impactScore: 0.6 
    },
    { 
      date: "2020-04", 
      eventType: "Remote Work Boom", 
      description: "Surge in adoption during global remote work shift", 
      impactScore: 0.9 
    },
    { 
      date: "2021-10", 
      eventType: "Mobile App Launch", 
      description: "Released iOS and Android apps with offline support", 
      impactScore: 0.7 
    }
  ]
};