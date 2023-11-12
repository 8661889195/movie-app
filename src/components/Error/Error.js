import { Alert, Space } from 'antd';

function ErrorCase({ name = 'Error', message = '', type = 'error', offline = false }) {
  if (offline) {
    type = 'warning';
    name = 'Offline';
    message = 'Что-то пошло не так. Но мы скоро все исправим';
  }

  return (
    <div style={{ display: 'flex' }}>
      <Space direction="vertical" style={{ width: 500, height: 200, margin: '35vh auto' }}>
        <Alert type={type} showIcon message={name} description={message} style={{ transform: 'scale(1.4)' }} />
      </Space>
    </div>
  )
}

export default ErrorCase;
