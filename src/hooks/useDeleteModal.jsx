import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from "antd";
import { useDeleteRequest } from './request';
const { confirm } = Modal;


function useDeleteModal(){
    const deleteRequest = useDeleteRequest()
    return (deleteUrl, reload) => (
        confirm({
            title: 'Are you sure delete this item?',
            icon: <ExclamationCircleFilled/>,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk(){
                await deleteRequest.request({url: deleteUrl})
                reload()
            },
            onCancel(){
                console.log('Cancel');
            },
        })
    )
}

export default useDeleteModal