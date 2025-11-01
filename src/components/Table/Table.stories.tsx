import Table, { TableColumn } from ".";
import { Button } from "../Button";
import Badge from "../Badge";

type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Pendente";
  lastAccess: string;
};

const people: Person[] = [
  {
    id: "1",
    name: "Ana Oliveira",
    email: "ana.oliveira@gov.br",
    role: "Analista de Sistemas",
    status: "Ativo",
    lastAccess: "2025-10-20",
  },
  {
    id: "2",
    name: "Bruno Lima",
    email: "bruno.lima@gov.br",
    role: "Coordenador",
    status: "Pendente",
    lastAccess: "2025-10-18",
  },
  {
    id: "3",
    name: "Carla Souza",
    email: "carla.souza@gov.br",
    role: "Designer",
    status: "Ativo",
    lastAccess: "2025-10-16",
  },
];

const basicColumns: TableColumn<Person>[] = [
  {
    key: "name",
    header: "Nome",
  },
  {
    key: "email",
    header: "E-mail",
  },
  {
    key: "role",
    header: "Função",
  },
  {
    key: "status",
    header: "Status",
  },
];

const customColumns: TableColumn<Person>[] = [
  {
    key: "name",
    header: "Servidor",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-govbr-gray-80">{row.name}</span>
        <span className="text-xs text-govbr-gray-60">{row.email}</span>
      </div>
    ),
  },
  {
    key: "role",
    header: "Função",
  },
  {
    key: "status",
    header: "Status",
    cell: ({ value }:any) => (
      <Badge
        variant={value === "Ativo" ? "success-light" : "warning-light"}
        size="small"
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "lastAccess",
    header: "Último acesso",
    accessor: ({ lastAccess }) =>
      new Date(lastAccess).toLocaleDateString("pt-BR"),
  },
  {
    key: "actions",
    header: "",
    align: "right",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost">
          Visualizar
        </Button>
        <Button  variant="ghost">
          Editar
        </Button>
      </div>
    ),
  },
];

type AttendanceSummary = {
  id: string;
  unit: string;
  presencial: number;
  remoto: number;
  total: number;
};

const attendanceData: AttendanceSummary[] = [
  {
    id: "1",
    unit: "Atendimento Presencial",
    presencial: 420,
    remoto: 180,
    total: 600,
  },
  {
    id: "2",
    unit: "Portal de Servicos",
    presencial: 260,
    remoto: 340,
    total: 600,
  },
  {
    id: "3",
    unit: "Ouvidoria",
    presencial: 180,
    remoto: 120,
    total: 300,
  },
];

const attendanceColumns: TableColumn<AttendanceSummary>[] = [
  {
    key: "unit",
    header: "Unidade",
  },
  {
    key: "presencial",
    header: "Presencial",
    align: "right",
    cell: ({ value }) =>
      Number(value).toLocaleString("pt-BR"),
  },
  {
    key: "remoto",
    header: "Remoto",
    align: "right",
    cell: ({ value }) =>
      Number(value).toLocaleString("pt-BR"),
  },
  {
    key: "total",
    header: "Total",
    align: "right",
    cell: ({ value }) =>
      Number(value).toLocaleString("pt-BR"),
  },
];

export default {
  component: Table,
  title: "Table",
};

export const Default = () => (
  <Table<Person>
    bordered
    zebra
    columns={basicColumns}
    data={people}
    rowKey={({ id }) => id}
  />
);

export const WithCustomCells = () => (
  <Table<Person>
    bordered
    columns={customColumns}
    data={people}
    density="relaxed"
    rowKey={({ id }) => id}
  />
);

export const Zebra = () => (
  <Table<Person>
    className="shadow-sm"
    columns={customColumns}
    data={people}
    density="default"
    rowKey={({ id }) => id}
    zebra
  />
);

export const Borderless = () => (
  <Table<Person>
    columns={customColumns}
    data={people}
    lined={false}
    rowKey={({ id }) => id}
  />
);

export const Dark = () => (
  <div className="rounded-md bg-govbr-blue-warm-vivid-90 p-4">
    <Table<Person>
      columns={customColumns}
    data={people}
    density="compact"
    rowKey={({ id }) => id}
    zebra
    variant="dark"
  />
</div>
);

export const WithSum = () => (
  <Table<AttendanceSummary>
    bordered
    columns={attendanceColumns}
    data={attendanceData}
    density="relaxed"
    rowKey={({ id }) => id}
    sum={["presencial", "remoto", "total"]}
    sumLabel="Total geral"
    sumFormatter={(value) => value.toLocaleString("pt-BR")}
  />
);
