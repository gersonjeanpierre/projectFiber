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
import { useState, useEffect } from "react";
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

  // Obtenemos el contexto del outlet que contiene el objeto CTO
  const outlet = useOutletContext<Cto>();
  const fetcher = useFetcher();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    cto: "", // Iniciamos vacío y lo actualizamos luego
    estado_cto: "",
    observacion: "",
    cto_campo: "",
    divisor: "",
    mcomentario: "",
  });

  // Estado para manejar el ID de edición
  const [editingId, setEditingId] = useState<number | null>(null);

  // useEffect para inicializar el campo `cto` solo en el primer renderizado o cuando `outlet.cto` cambie.
  useEffect(() => {
    if (outlet?.cto) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cto: outlet.cto,
      }));
    }
  }, [outlet?.cto]); // Se ejecutará cuando `outlet.cto` cambie.

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await updateItem("ctoDB", "ctoStore", editingId, formData);
    } else {
      await addItem("ctoDB", "ctoStore", formData);
    }
    fetcher.load("/cto");
    setFormData({
      cto: outlet.cto,
      estado_cto: "",
      observacion: "",
      cto_campo: "",
      divisor: "",
      mcomentario: "",
    });
    setEditingId(null);
  };

  // Maneja la eliminación de un item
  const handleDelete = async (id: number) => {
    await deleteItem("ctoDB", "ctoStore", id);
    fetcher.load("/cto");
  };

  // Maneja la edición de un item
  const handleEdit = (item: any) => {
    setFormData(item);
    setEditingId(item.id);
  };

  return (
    <>
      <Card className="w-full mt-3">
        <CardTitle className="pl-6 py-3 text-xl">Monitoreo</CardTitle>
        <CardContent>
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
              disabled
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
        </CardContent>
      </Card>
    </>
  );
}
