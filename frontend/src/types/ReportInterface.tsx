import { ChangeEvent } from 'react';

export interface Company {
  companyName: string;
  _id: string;
}

export interface Error {
  reportName: string;
  selectedCompanies: string;
}

export interface Report {
  createdBy: string;
  reportName: string;
  reportType: string;
  selectedCompanies: string[];
  _id: string;
  companyData: Company[];
}

export interface ReportTable {
  totalReports: number;
  reports: Report[];
  deleteSvgClickHandler: (singleReport: Report) => void;
  user: any;
  copyTextHandler: (reportName: string) => void;
}

export interface SearchSection {
  search: string;
  predictiveSearchHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface CreateReportProps {
  isCreate: boolean;
  reportData?: Report;
}

export interface UpdateReport {
  message: string;
  report: Report;
}
