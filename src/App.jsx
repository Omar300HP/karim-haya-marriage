import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import intervalToDuration from "date-fns/intervalToDuration";
import "./style.scss";

const MARRIAGE_DATE = new Date(2021, 8, 24, 18);

function CounterCell({ title, value }) {
  return (
    <Col>
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
  const [timeSinceWedding, setTimeSinceWedding] = useState({});

  useEffect(() => {
    let timeInterval = setTimeout(() => {
      let dateNow = new Date();

      let duration = intervalToDuration({
        start: MARRIAGE_DATE,
        end: dateNow,
      });

      setTimeSinceWedding(duration);
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

            {timeSinceWedding.days && (
              <Col xs={12} md={6}>
                <Card className="wedding-card">
                  <Row className="justify-content-center">
                    {timeSinceWedding.years ? (
                      <CounterCell
                        value={timeSinceWedding.years}
                        title="Years"
                      />
                    ) : (
                      ""
                    )}
                    <CounterCell
                      value={timeSinceWedding.months}
                      title="Months"
                    />
                    <CounterCell value={timeSinceWedding.days} title="Days" />
                    <CounterCell value={timeSinceWedding.hours} title="Hours" />
                    <CounterCell
                      value={timeSinceWedding.minutes}
                      title="Minutes"
                    />
                    <CounterCell
                      value={timeSinceWedding.seconds}
                      title="Seconds"
                    />
                  </Row>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
