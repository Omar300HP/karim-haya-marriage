import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import intervalToDuration from "date-fns/intervalToDuration";
import "./style.scss";

const MARRIAGE_DATE = new Date(2021, 8, 24, 18);

function CounterCell({ title, value }) {
  return (
    <Col xs={3} md={1}>
      <Row>
        <Col xs={12}>
          <h3 className="subtitle center-text text-shadow">{title}</h3>
        </Col>
        <Col xs={12}>
          <h3 className="subtitle center-text text-shadow">{value || 0}</h3>
        </Col>
      </Row>
    </Col>
  );
}

function App() {
  const [timeNow, setTimeNow] = useState(new Date());
  const [timeTillWedding, setTimeTillWedding] = useState({});

  useEffect(() => {
    let timeInterval = setTimeout(() => {
      let dateNow = new Date();

      let duration = intervalToDuration({
        start: dateNow,
        end: MARRIAGE_DATE,
      });

      setTimeTillWedding(duration);
      setTimeNow(dateNow);
    }, 1000);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [timeNow]);

  return (
    <div className={`App`}>
      <div className="tint-color">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12}>
              <h3 className="center-text all-cap title text-shadow">
                Congratulations!
              </h3>
            </Col>
            <Col xs={12}>
              <h1 className="subtitle center-text text-shadow">
                Karim &#10084;&#65039; Haya
              </h1>
            </Col>
            <Col xs={12}>
              <h3 className="subtitle center-text text-shadow">
                {`${MARRIAGE_DATE.toLocaleString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`}
              </h3>
            </Col>

            {timeTillWedding.days && (
              <Row className="justify-content-center">
                <CounterCell value={timeTillWedding.days} title="Days" />
                <CounterCell value={timeTillWedding.hours} title="Hours" />
                <CounterCell value={timeTillWedding.minutes} title="Minutes" />
                <CounterCell value={timeTillWedding.seconds} title="Seconds" />
              </Row>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
