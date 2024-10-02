import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface RouteNameProps {
  routeName: string;
  ctos: string[];
}

export default function RouteContent({ routeName, ctos }: RouteNameProps) {
  const [ctoList, setCtoList] = useState([]);
  const [selectedCto, setSelectedCto] = useState(null);
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
  });

  useEffect(() => {
    // In a real application, you would fetch this data from your xlsx parsing result
    setCtoList(["CTO1", "CTO2", "CTO3"]);
  }, [routeName]);

  const handleCtoSelect = (cto) => {
    setSelectedCto(cto);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Save to IndexedDB
    const dbName = "RouteDB";
    const dbVersion = 1;
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["routeData"], "readwrite");
      const store = transaction.objectStore("routeData");

      const data = {
        routeName,
        cto: selectedCto,
        ...formData,
      };

      const addRequest = store.add(data);

      addRequest.onerror = (event) => {
        console.error("Error adding data:", event.target.error);
      };

      addRequest.onsuccess = (event) => {
        console.log("Data added successfully");
        // Reset form and close dialog
        setFormData({
          field1: "",
          field2: "",
          field3: "",
          field4: "",
          field5: "",
          field6: "",
          field7: "",
          field8: "",
          field9: "",
          field10: "",
        });
        setSelectedCto(null);
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("routeData", { keyPath: "id", autoIncrement: true });
    };
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{routeName}</h2>
      <ul>
        {ctoList.map((cto) => (
          <li key={cto} className="mb-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => handleCtoSelect(cto)}>{cto}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter data for {cto}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {[...Array(10)].map((_, index) => (
                    <div key={index}>
                      <Label htmlFor={`field${index + 1}`}>
                        Field {index + 1}
                      </Label>
                      <Input
                        id={`field${index + 1}`}
                        name={`field${index + 1}`}
                        value={formData[`field${index + 1}`]}
                        onChange={handleFormChange}
                      />
                    </div>
                  ))}
                  <Button type="submit">Save</Button>
                </form>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
}
