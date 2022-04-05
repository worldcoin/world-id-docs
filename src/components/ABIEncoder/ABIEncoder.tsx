import React, { useState } from "react";
import { defaultAbiCoder as abi } from "@ethersproject/abi";

export function ABIEncoder(): JSX.Element {
  const [value, setValue] = useState("");
  const [valueType, setValueType] = useState("string");
  return (
    <div>
      <div className="input-group">
        <label>Value to encode</label>
        <input
          type="text"
          placeholder="Enter a value to encode"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Type of value</label>
        <select
          value={valueType}
          onChange={(e) => setValueType(e.target.value)}
        >
          <option value="string">String</option>
          <option value="uint256">Integer</option>
          <option value="address">Address</option>
        </select>
      </div>
      <div className="input-group">
        <label>Output</label>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {abi.encode([valueType], [value])}
        </pre>
      </div>
    </div>
  );
}
