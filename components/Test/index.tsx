import React from "react";

export interface TestInterface {
  title: string;
}

const prefixCls = "happy-alert";

export const Test: React.FC<TestInterface> = ({ title }: TestInterface) => (
  <div className={prefixCls}>{title}</div>
);

Test.defaultProps = {
  title: ""
};
