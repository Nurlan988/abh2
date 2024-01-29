import React, { useEffect, useState } from "react";
import { dateFormatter } from "../commons";
import CustomLink from "./CustomLink";
import { ACTIVE, INACTIVE } from "../constants";

export const UserData = ({ data }) => {
    const [color, setColor] = useState(null);

    useEffect(() => {
        if (data.status === ACTIVE) {
            setColor("green");
        } else if (data.status === INACTIVE) {
            setColor("orange");
        } else {
            setColor("red");
        }
    }, [data.status]);

    return (
        <tr>
            <td>
                <CustomLink
                    to={`/${data.id}`}
                    style={{ width: "100%", display: "block" }}
                >
                    {data.fullname}
                </CustomLink>
            </td>
            <td>{dateFormatter(data.created_at)}</td>
            <td>{data.phone}</td>
            <td>{data.region}</td>
            <td
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                {data.status}{" "}
                <div
                    style={{
                        backgroundColor: color,
                    }}
                    className="status-icon"
                ></div>
            </td>
        </tr>
    );
};
