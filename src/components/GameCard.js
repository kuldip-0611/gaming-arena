import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../features/userSlice";
import star from "../assets/image/star.svg";
import check from "../assets/image/check.svg";
import no from "../assets/image/no.svg";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Container,
  Row,
} from "reactstrap";
import editorChoice from "../assets/image/editorChoice.png";
const GameCard = () => {
  const selected_users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  /* A hook that is used for performing side effects in function components. */
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      <Container>
        <Row>
          {selected_users.duplicate_users.map((item,index) => (
            (item.title === undefined) ? null :
              <Card
                key={index}
                style={{
                  width: "25rem",
                }}

                className="m-3"
              >
                <CardBody>
                  <CardTitle tag="h5">
                    {item.title}
                    <CardSubtitle className="mt-3 text-muted">
                      {item.platform}
                    </CardSubtitle>
                  </CardTitle>

                  <CardText className="card-item1">
                    {item.genre}
                    <Button className="rate-button">
                      {item.score}
                      <img src={star} alt="this is score" />
                    </Button>
                  </CardText>
                </CardBody>
                <div className="d-flex align-items-center justify-content-flexstart">
                  <img src={editorChoice} alt="this is choice" height="100px" width="150px" />
                  {item.editors_choice === "Y" ? (
                    <img src={check} alt="this is yes" height1="50px" width="50px" />
                  ) : (
                    <img src={no} alt="this is no" height="50px" width="50px" />
                  )}
                </div>
              </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default GameCard;
