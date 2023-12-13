import { capitalizeText } from "@/utils";
import { openSans } from "@/utils/fonts";
import { Dropdown, MenuProps, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import ApproveCompanyModal from "../modals/ApproveCompanyModal";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Props {
  data: any[];
  isLoading?: boolean;
  perPage?: number;
  status?: "approved" | "pending" | "rejected";
}

const CompanyTable = ({ data, isLoading, perPage, status }: Props) => {
  // dropdown items
  const getItems = (value: any): MenuProps["items"] => {
    return [
      {
        label: (
          <Link
            href={`/dashboard/cyboks/info/${value?.id}/stage1`}
            className="text-[0.95rem] font-semibold"
          >
            View
          </Link>
        ),
        key: "view",
        className: openSans.className,
        onClick: () => {
          // setExportersState(value);
        },
      },
      {
        type: "divider",
      },
      {
        label: <ApproveCompanyModal reviewerApprove={value.reviewerApprove} companyId={value.id} isPending />,
        key: "send",
        className: openSans.className,
      },
      {
        type: "divider",
      },
      // {
      //   label: <RejectExporterModal exporterId={value.id} isPending />,
      //   key: "reject",
      //   className: openSans.className,
      // },
    ];
  };

  // columns
  const columns: ColumnsType<any> = [
    {
      title: <span className="text-violet-500">No</span>,
      className: openSans.className,
      render: (value, record, index) => index + 1,
    },
    {
      title: <span className="text-violet-500">Company</span>,
      dataIndex: "user",
      key: "user",
      className: openSans.className,
      render: (value, record, index) =>
        capitalizeText(value?.companyName ? value.companyName : "unknown"),
    },
    {
      title: <span className="text-violet-500">DPO&apos;s Name</span>,
      dataIndex: "user",
      key: "user",
      className: openSans.className,
      render: (value, record, index) =>
        capitalizeText(value?.userName ? value.userName : "unknown"),
    },
    {
      title: <span className="text-violet-500">DPO&apos;s Email Address</span>,
      dataIndex: "user",
      key: "user",
      className: openSans.className,
      render: (value, record, index) =>
        capitalizeText(value?.userEmail ? value.userEmail : "unknown"),
    },
    {
      title: <span className="text-violet-500">DPO&apos;s Phone Number</span>,
      dataIndex: "user",
      key: "user",
      className: openSans.className,
      render: (value, record, index) =>
        capitalizeText(
          value?.companyPhoneNumber ? value.companyPhoneNumber : "unknown"
        ),
    },
    {
      title: <span className="text-violet-500">Document&apos;s Status</span>,
      dataIndex: "status",
      key: "status",
      className: openSans.className,
      render: (value, record, index) => {
        switch (value) {
          case "submitted":
            return (
              <span className="text-violet-500 font-semibold">Submitted</span>
            );

          case "underreviewer":
            return (
              <span className="text-yellow-500 font-semibold">Under cyboks</span>
            );
          case "certified":
            return (
              <span className="text-green-500 font-semibold">Certified</span>
            );

          case "underncsa":
            return (
              <span className="text-yellow-500 font-semibold">Under NCSA</span>
            );

          default:
            return (
              <span className="text-zinc-500 font-semibold">Not stated</span>
            );
        }
      },
    },

    {
      title: <span className="text-violet-500">Action</span>,
      className: openSans.className,
      render: (value, record, index) => {
        switch (status) {
          case "rejected":
            return <ApproveCompanyModal companyId={value.id} />;
          case "pending":
            return (
              <Dropdown
                menu={{
                  items: getItems(value),
                }}
                trigger={["click"]}
              >
                <button className="text-white bg-violet-500 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-1 text-center flex items-center gap-1 dark:bg-violet-500 dark:hover:bg-violet-500 dark:focus:ring-violet-800">
                  Options
                  <DownOutlined />
                </button>
              </Dropdown>
            );
          default:
          //return <RejectExporterModal exporterId={value.id} />;
        }
      },
    },
  ];

  return (
    <div className="overflow-auto shadow-md">
      <Table
        dataSource={data}
        columns={columns}
        className={`${openSans.className} text-gray-900 whitespace-nowrap`}
        pagination={{ pageSize: perPage || 10, position: ["bottomCenter"] }}
        loading={isLoading}
      />
    </div>
  );
};

export default CompanyTable;
