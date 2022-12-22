import {Modal, Form, Input} from 'antd';

const ChatModal = ({modalOpen, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return(
        <Modal
            open={modalOpen}
            title='Create a new chatroom'
            okText='Create'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((e)=>{window.alert(e);});
            }} 
        >
            <Form form={form} layout='vertical' name='form_in_modal'>
                <Form.Item name="name" label="Name" rules={[{
                    required: true,
                    message: 'Please enter the name of the person to chat.'
                }]}>
                    <Input></Input>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChatModal