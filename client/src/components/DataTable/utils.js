export const adminColumns = [
    { id: "userName", label: "NAME", align: "left" },
    { id: "email", label: "EMAIL", align: "left" },
    {
      id: "isMaster",
      label: "AUTHORITY",
      align: "left",
      format: (value) => (value ? "Master Admin" : "Admin"),
    },
    {
      id: "createdAt",
      label: "CREATED AT",
      align: "left",
      format: (value) => new Date(value).toLocaleDateString(),
    },
    {
      id: "action",
      label: "ACTION",
      align: "center",
    },
  ];

export const studentColumns = [
    { id: "rollNumber", label: "ROLL NUMBER", align: "left" },
    { id: "userName", label: "NAME", align: "left" },
    {
      id: "createdAt",
      label: "CREATED AT",
      align: "left",
      format: (value) => new Date(value).toLocaleDateString(),
    },
    {
      id: "action",
      label: "ACTION",
      align: "center",
    },
] 