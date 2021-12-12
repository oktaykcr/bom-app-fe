import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { isString } from "../../util/index";

export default function CSVExport({ title, columns, data }) {
    const [excelColumns, setExcelColumns] = useState([]);

    useEffect(() => {
        setExcelColumns(columns.map((col) => {
            let obj = {};
            obj["label"] = isString(col["Header"]) ? col["Header"] : "undefined";
            obj["key"] = isString(col["accessor"]) ? col["accessor"] : col["id"];
            return obj;
        }));
    }, [columns]);

    return (
        <CSVLink
            className="btn btn-primary"
            filename={`bom_app_${title}`}
            data={data}
            headers={excelColumns}>
            Export
        </CSVLink>
    );
}