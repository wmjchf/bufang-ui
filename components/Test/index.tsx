import React, { useState } from "react";

export interface TestInterface {
  title: string;
}

const prefixCls = "happy-alert";

const Test: React.FC<TestInterface> = ({ title }: TestInterface) => {
  // 填充的padding

  return <div className={prefixCls}>{title}</div>;
};

Test.defaultProps = {
  title: ""
};
export default Test;
