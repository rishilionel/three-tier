import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Input, Popconfirm, Row, Table,Typography,Space } from 'antd';
import { Modal } from 'antd';
import AddNewBook from './AddNewBook';
const EditableContext = React.createContext(null);

//const BASE_URL = 'https://app-backend-java.azurewebsites.net/api/v1/book';

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

const BookTable = () => {

    const BASE_URL = process.env.REACT_APP_API_URL;

    const [bookDetails, setBookDetails] = useState([]);
    const [openAddBookModel, setOpenAddBookModel] = useState(false);
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState();
    const [yearOfPublication, setYearOfPublication] = useState("");

    const [dataSource, setDataSource] = useState([
        {
            id: '1',
            name: 'book-1',
            author: 'surya',
            price: 20.00,
            yearOfPublication: '2024'
        },
        {
            id: '2',
            name: 'book-2',
            author: 'rishi',
            price: 30.00,
            yearOfPublication: '2025'
        },
    ]);

    const [count, setCount] = useState(2);

    useEffect(() => {
        // get data from backend
        fetchAllBookDetails();
    }, []);


    const fetchAllBookDetails = () => {

        fetch(BASE_URL + '/all', {
            method: 'GET',
            // Added these below 3 headers for setting cookie in a non https site
            // credentials: "include",
            // withCredentials: true,
            crossDomain: true,
        }).then( res => {
            if (res.status == 200) {
                return res.json();
            } else {
                return null;
            }
        }).then( result => {
            setBookDetails(result);
        });
    }


const handleDelete = (key) => {
    fetch(BASE_URL+'/'+key,{
        method:'DELETE',
        crossDomain: true,
    });
    fetchAllBookDetails();
};

const defaultColumns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: '10%',
        editable: false,
    },
    {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: false,
    },
    {
        title: 'author',
        dataIndex: 'author',
    },
    {
        title: 'price',
        dataIndex: 'price',
    },
    {
        title: 'year of publication',
        dataIndex: 'yearOfPublication',
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
            bookDetails.length >= 1 ? (
                <Row>
                    <Col style={{ margin: '4px' }}>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </Col>
                    {/* <Col style={{ margin: '4px' }}>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            <a>Edit</a>
                        </Popconfirm>
                    </Col> */}
                </Row>
            ) : null,
    },
];

const handleCancel = () => {
    setOpenAddBookModel(false);
}

const ClearAll = () => {
    setAuthor("");
    setName("");
    setYearOfPublication("");
    setPrice("");
}

const handleOk = () => {
    let inputJson = {
        name: name,
        author: author,
        price: price,
        yearOfPublication: yearOfPublication
    }
    fetch(BASE_URL+'/add',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(inputJson),
    }).then(res => res.json()).then(result => {
        console.log('response data==',result);
    });
    ClearAll();
    setOpenAddBookModel(false);
    fetchAllBookDetails();

}

const handleAdd = () => {
    setOpenAddBookModel(true);
};

const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
        ...item,
        ...row,
    });
    setDataSource(newData);
};

const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};

const columns = defaultColumns.map((col) => {
    if (!col.editable) {
        return col;
    }
    return {
        ...col,
        onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
        }),
    };
});

return (
    <div>
        <Button
            onClick={handleAdd}
            type="primary"
            style={{
                marginBottom: 16,
                backgroundColor: '#1976d2'
            }}
        >
            Add Book
        </Button>
        <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={[...bookDetails]}
            columns={columns}
        />
        <Modal
        open={openAddBookModel}
        title="Add New Book"
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>
    </div>
);
};
export default BookTable;