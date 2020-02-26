import React from "react";
import s from "./Results.module.css";
import { TestResultSet, TestResult, TestStatus } from "./TestResults";

function iconFromStatus(status: TestStatus): string {
  switch (status) {
    case TestStatus.FAILURE:
      return "❌";
    case TestStatus.PENDING:
      return "⚪️";
    case TestStatus.SUCCESS:
      return "✅";
    case TestStatus.SKIPPED:
      return "⏭️";
    case TestStatus.RUNNING:
      return "🏃‍♀️";
  }
  console.log("Unknown status", status);
  return "";
}

function TestListItem({ result }: { result: TestResult }) {
  return (
    <div className={s.SingleTestResult}>
      {iconFromStatus(result.status)} {result.name}
    </div>
  );
}

function TestListRow({ testListItem }: { testListItem: TestResultSet }) {
  return (
    <div className={s.TestListRow}>
      <div className={s.TestListHeader}>
        <span className={s.TestListStatus}>
          {iconFromStatus(testListItem.status)}{" "}
        </span>
        <span className={s.TestListItemName}>{testListItem.name}</span>
      </div>
      <div className={s.TestListResults}>
        {testListItem.results.map(result => (
          <TestListItem key={result.name} result={result} />
        ))}
      </div>
    </div>
  );
}

export default function TestList({
  testList
}: {
  testList: TestResultSet[] | null;
}) {
  if (!testList) return <div></div>;
  return (
    <div>
      {testList.map(testListItem => {
        return (
          <TestListRow key={testListItem.name} testListItem={testListItem} />
        );
      })}
    </div>
  );
}
