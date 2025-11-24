interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  department: string;
}

export const usersData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    status: "active",
    joinDate: "2023-01-15",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Product Manager",
    status: "active",
    joinDate: "2023-02-20",
    department: "Product",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "UX Designer",
    status: "inactive",
    joinDate: "2022-11-10",
    department: "Design",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "Data Scientist",
    status: "active",
    joinDate: "2023-03-05",
    department: "Engineering",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Marketing Manager",
    status: "active",
    joinDate: "2023-01-30",
    department: "Marketing",
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "HR Specialist",
    status: "active",
    joinDate: "2022-12-15",
    department: "Human Resources",
  },
  {
    id: 7,
    name: "Edward Clark",
    email: "edward.clark@example.com",
    role: "DevOps Engineer",
    status: "inactive",
    joinDate: "2022-10-20",
    department: "Engineering",
  },
  {
    id: 8,
    name: "Fiona Davis",
    email: "fiona.davis@example.com",
    role: "Sales Representative",
    status: "active",
    joinDate: "2023-04-12",
    department: "Sales",
  },
  {
    id: 9,
    name: "George Miller",
    email: "george.miller@example.com",
    role: "Quality Assurance",
    status: "active",
    joinDate: "2023-02-28",
    department: "Engineering",
  },
  {
    id: 10,
    name: "Helen Taylor",
    email: "helen.taylor@example.com",
    role: "Finance Manager",
    status: "active",
    joinDate: "2022-09-18",
    department: "Finance",
  },
  {
    id: 11,
    name: "Ian Wilson",
    email: "ian.wilson@example.com",
    role: "Content Writer",
    status: "inactive",
    joinDate: "2023-05-20",
    department: "Marketing",
  },
  {
    id: 12,
    name: "Julia Anderson",
    email: "julia.anderson@example.com",
    role: "Business Analyst",
    status: "active",
    joinDate: "2023-03-22",
    department: "Product",
  },
];
