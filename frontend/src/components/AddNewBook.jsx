import { Col, Input, Typography } from "antd";
import { useState } from "react";
import { Space, Row } from "antd";


const AddNewBook = () => {

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [yearOfPublication, setYearOfPublication] = useState("");


    return (
        <Space>
            <Col>
                <Row>
                    <Typography>
                        Name :
                    </Typography>
                    <Input
                        placeholder="enter name"
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </Row>
                <Row>
                    <Typography>
                        Author :
                    </Typography>
                    <Input
                        placeholder="enter author name"
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author} />
                </Row>
                <Row>
                    <Typography>
                        Price Amount :
                    </Typography>
                    <Input
                        placeholder="enter price amount"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price} />
                </Row>
                <Row>
                    <Typography>
                        Year of Publication :
                    </Typography>
                    <Input
                        placeholder="enter year of publication"
                        onChange={(e) => setYearOfPublication(e.target.value)}
                        value={yearOfPublication} />
                </Row>
            </Col>
        </Space>
    );

}

export default AddNewBook;