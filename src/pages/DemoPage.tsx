import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Alert } from "../components/ui/Alert";
import { Avatar } from "../components/ui/Avatar";
import { Spinner } from "../components/ui/Spinner";
import { Switch } from "../components/ui/Switch";
import { Breadcrumb } from "../components/layout/BreadCrumb";

const DemoPage: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked);
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb currentPage="LAPORAN" currentHref="/" />
      <h1 className="text-3xl font-semibold">UI Components Demo Page</h1>

      {/* Input Component */}
      <section>
        <h2 className="text-xl font-medium">Input Component</h2>
        <Input placeholder="Enter text..." size="md" variant="default" />
      </section>

      {/* Badge Component */}
      <section>
        <h2 className="text-xl font-medium">Badge Component</h2>
        <Badge variant="success" size="sm">
          Success
        </Badge>
        <Badge variant="error" size="lg">
          Error
        </Badge>
      </section>

      {/* Card Component */}
      <section>
        <h2 className="text-xl font-medium">Card Component</h2>
        <Card padding="md" shadow="lg">
          <h3 className="text-lg font-semibold">Card Title</h3>
          <p>This is a card component with some content inside.</p>
        </Card>
      </section>

      {/* Alert Component */}
      <section>
        <h2 className="text-xl font-medium">Alert Component</h2>
        <Alert variant="info" onClose={() => alert("Closed")}>
          This is an info alert.
        </Alert>
        <Alert variant="success" onClose={() => alert("Closed")}>
          This is a success alert.
        </Alert>
      </section>

      {/* Avatar Component */}
      <section>
        <h2 className="text-xl font-medium">Avatar Component</h2>
        <Avatar src="https://via.placeholder.com/150" size="md" />
        <Avatar size="lg" fallback="AB" />
      </section>

      {/* Spinner Component */}
      <section>
        <h2 className="text-xl font-medium">Spinner Component</h2>
        <Spinner size="sm" color="primary" />
        <Spinner size="lg" color="secondary" />
      </section>

      {/* Switch Component */}
      <section>
        <h2 className="text-xl font-medium">Switch Component</h2>
        <Switch
          checked={switchChecked}
          onChange={handleSwitchChange}
          size="md"
        />
        <p className="mt-2">Switch is {switchChecked ? "ON" : "OFF"}</p>
      </section>
    </div>
  );
};

export default DemoPage;
