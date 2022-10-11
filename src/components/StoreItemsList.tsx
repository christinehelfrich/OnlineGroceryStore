//import data from "../data/items.json";
import { StoreItem } from "../components/StoreItem";
import { Row, Col, Spinner } from "react-bootstrap";
import { StoreItemAdd } from "./StoreItemAdd";
import useFetch from "../hooks/useFetch";
import { PageNotFound } from "./PageNotFound";

export function StoreItemsList() {
  const { data: data, loading, error } = useFetch("src/data/items.json");
  if (data == null) return <PageNotFound />;
  if (error) throw error;
  if (loading) return <Spinner animation={"border"} />;
  if (data!.length === 0) return <PageNotFound />;
  return (
    <>
      <h1>Store</h1>
      <StoreItemAdd />
      <Row md={2} xs={1} lg={3} className="g-3">
        {data!.map((item: any) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
