import React, { useState } from "react";
import "./App.css";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
  Table,
} from "reactstrap";
import { get, isEmpty, map } from "lodash";
import Request from "./utils/request";
import CopyToClipboard from "./components/CopyToClipboard";

function App() {
  const [transactionId, setTransactionId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [displayData, showDisplayData] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Request({
      url: `/transaction?transactionId=${transactionId}&transactionType=${transactionType}`,
      method: "GET",
    });
    setTransactions(data);
    setTransactionId("");
    setTransactionType("");
  };

  const getTableData = () => {
    return map(
      transactions,
      ({ transactionId, transactionType, payload }, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{transactionId}</td>
          <td>{transactionType}</td>
          <td>
            <Button
              onClick={() => {
                showDisplayData({ transactionId, transactionType, payload });
                window.scrollTo(0, 0);
              }}
              color="primary"
            >
              View
            </Button>
          </td>
        </tr>
      )
    );
  };

  const saveTemplateAsFile = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], {
      type: "text/json",
    });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  };

  return (
    <div className="App">
      <h1 className="text-center">ONDC Log Monitor</h1>
      <Container className="mt-3" fluid>
        <Form role="form" onSubmit={(e) => onSubmit(e)}>
          <Row className="d-flex align-items-center">
            <Col sm={3}>
              <FormGroup>
                <Label for="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  placeholder="eg. 02629af0-1c4e-44b7-ac3d-2d574a6b14be"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <Label for="exampleEmail">Transaction Type</Label>
                <Input
                  id="exampleSelectMulti"
                  name="selectMulti"
                  type="select"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option></option>
                  <option>search</option>
                  <option>on_search</option>
                  <option>select</option>
                  <option>on_select</option>
                  <option>init</option>
                  <option>on_init</option>
                  <option>confirm</option>
                  <option>on_confirm</option>
                  <option>cancel</option>
                  <option>on_cancel</option>
                  <option>update</option>
                  <option>on_update</option>
                  <option>status</option>
                  <option>on_status</option>
                  <option>track</option>
                  <option>on_track</option>
                  <option>support</option>
                  <option>on_support</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={1} className="mt-2">
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="mx-2">
          <Col md="6">
            <div className="table-responsive">
              <Table responsive>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Transaction ID</th>
                    <th>Transaction Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{getTableData()}</tbody>
              </Table>
            </div>
          </Col>
          <Col className="" md="6">
            <Row className="mb-2 d-flex justify-content-end mr-6">
              <Col md="1">
                <CopyToClipboard
                  text={JSON.stringify(
                    JSON.parse(get(displayData, "payload", "")),
                    null,
                    3
                  )}
                >
                  <Button
                    size="sm"
                    color="info"
                    onClick={() => {}}
                    disabled={isEmpty(get(displayData, "payload", ""))}
                  >
                    Copy
                  </Button>
                </CopyToClipboard>
              </Col>
              <Col md="1">
                <Button
                  size="sm"
                  color="info"
                  onClick={() => {
                    saveTemplateAsFile(
                      `${get(displayData, "transactionType", "")}_${get(
                        displayData,
                        "transactionId",
                        ""
                      )}.json`,
                      JSON.parse(get(displayData, "payload", ""))
                    );
                  }}
                  disabled={isEmpty(get(displayData, "payload", ""))}
                >
                  Download
                </Button>
              </Col>
            </Row>
            {displayData && (
              <pre className="border json-container">
                {JSON.stringify(
                  JSON.parse(get(displayData, "payload", "")),
                  null,
                  3
                )}
              </pre>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
