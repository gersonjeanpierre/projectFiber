import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { Cto } from "~/components/interface/Route";
import {
  addItem,
  deleteItem,
  updateItem,
} from "~/components/services/monitoreoService";
import { Button } from "~/components/ui/button";
import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Monitoring() {
  const navigate = useNavigate();

  const fetcher = useFetcher();
  const items = useLoaderData();
  const [formData, setFormData] = useState({
    cto: "",
    estado_cto: "",
    observacion: "",
    cto_campo: "",
    divisor: "",
    mcomentario: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await updateItem("ctoDB", "ctoStore", editingId, formData);
    } else {
      await addItem("ctoDB", "ctoStore", formData);
    }
    fetcher.load("/cto");
    setFormData({
      cto: "",
      estado_cto: "",
      observacion: "",
      cto_campo: "",
      divisor: "",
      mcomentario: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    await deleteItem("ctoDB", "ctoStore", id);
    fetcher.load("/cto");
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setEditingId(item.id);
  };

  console.log("items", items);

  return (
    <>
      <Card className="w-full mt-3">
        <CardTitle>
          <h1 className="text-2xl font-bold">Monitoreo</h1>
        </CardTitle>
        <CardContent>
          <h1>Formulario CTO</h1>
          <Form method="post" onSubmit={handleSubmit}>
            <Label htmlFor="cto">CTO</Label>
            <Input
              type="text"
              name="cto"
              value={formData.cto}
              onChange={(e) =>
                setFormData({ ...formData, cto: e.target.value })
              }
              placeholder="CTO"
              required
            />
            <Label htmlFor="estado_cto">Estado CTO</Label>
            <Input
              type="text"
              name="estado_cto"
              value={formData.estado_cto}
              onChange={(e) =>
                setFormData({ ...formData, estado_cto: e.target.value })
              }
              placeholder="Estado CTO"
              required
            />
            <Label htmlFor="observacion">Observación</Label>
            {/* <Input
              type="text"
              name="observacion"
              value={formData.observacion}
              onChange={(e) =>
                setFormData({ ...formData, observacion: e.target.value })
              }
              placeholder="Observación"
              required
            /> */}
            <Select
              value={formData.observacion}
              onValueChange={(value: string) =>
                setFormData({ ...formData, observacion: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el estado inicial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cto-mal-estado">CTO MAL ESTADO</SelectItem>
                <SelectItem value="cto-robado">CTO ROBADO</SelectItem>
                <SelectItem value="arbol-arbusto-impide-acceso">
                  ARBOL/ARBUSTO IMPIDE ACCESO A CTO
                </SelectItem>
                <SelectItem value="riesgo-electrico">
                  RIESGO ELECTRICO
                </SelectItem>
                <SelectItem value="calle-angosta">CALLE ANGOSTA</SelectItem>
                <SelectItem value="carros-estacionados">
                  CARROS ESTACIONADOS
                </SelectItem>
                <SelectItem value="cto-vertical">CTO VERTICAL</SelectItem>
                <SelectItem value="escalera-no-alcanza-cto">
                  ESCALERA NO ALCANZA CTO
                </SelectItem>
                <SelectItem value="poste-mal-estado">
                  POSTE MAL ESTADO
                </SelectItem>
                <SelectItem value="problemas-con-vecinos">
                  PROBLEMAS CON VECINOS O MUNICIPIO
                </SelectItem>
                <SelectItem value="zona-de-mercado">ZONA DE MERCADO</SelectItem>
                <SelectItem value="techo-impide-acceso">
                  TECHO IMPIDE ACCESO
                </SelectItem>
                <SelectItem value="cto-en-fachada">CTO EN FACHADA</SelectItem>
                <SelectItem value="calle-con-pendiente">
                  CALLE CON PENDIENTE
                </SelectItem>
                <SelectItem value="via-con-transito">
                  VIA CON TRANSITO
                </SelectItem>
                <SelectItem value="calle-con-gradas">
                  CALLE CON GRADAS
                </SelectItem>
                <SelectItem value="desmonte-impide-acceso">
                  DESMONTE IMPIDE ACCESO
                </SelectItem>
                <SelectItem value="poste-impide-acceso">
                  POSTE IMPIDE ACCESO
                </SelectItem>
                <SelectItem value="zona-en-obra">ZONA EN OBRA</SelectItem>
                <SelectItem value="reja-impide-acceso">
                  REJA IMPIDE ACCESO
                </SelectItem>
                <SelectItem value="letrero-impide-acceso">
                  LETRERO IMPIDE ACCESO A CTO
                </SelectItem>
                <SelectItem value="puerto-no-detectado">
                  PUERTO NO DETECTADO
                </SelectItem>
                <SelectItem value="cochera-impide-acceso">
                  COCHERA IMPIDE ACCESO
                </SelectItem>
                <SelectItem value="zona-peligrosa">ZONA PELIGROSA</SelectItem>
                <SelectItem value="calle-con-desnivel">
                  CALLE CON DESNIVEL
                </SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="cto_campo">CTO Campo</Label>
            <Input
              type="text"
              name="cto_campo"
              value={formData.cto_campo}
              onChange={(e) =>
                setFormData({ ...formData, cto_campo: e.target.value })
              }
              placeholder="CTO Campo"
              required
            />
            <Label htmlFor="divisor">Divisor</Label>
            <Input
              type="text"
              name="divisor"
              value={formData.divisor}
              onChange={(e) =>
                setFormData({ ...formData, divisor: e.target.value })
              }
              placeholder="Divisor"
              required
            />
            <div>
              <Label htmlFor="mcomentario">Comentario</Label>
              <Input
                type="text"
                name="mcomentario"
                value={formData.mcomentario}
                onChange={(e) =>
                  setFormData({ ...formData, mcomentario: e.target.value })
                }
                placeholder="Comentario"
                required
              />
            </div>
            <Button className="mt-2" type="submit">
              {editingId ? "Actualizar" : "Crear"}
            </Button>
          </Form>

          {/* <div>
            <h2>Lista de CTOs</h2>
            <ul>
              {items.map((item: any) => (
                <li key={item.id}>
                  {item.cto} - {item.estado_cto}
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
}
