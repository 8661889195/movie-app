import { Space, Typography } from 'antd'

const { Text } = Typography;

function Genre({ genreName }) {
  return (
    <li className="movie_genres-item">
      <Space>
        <Text code>{genreName}</Text>
      </Space>
    </li>
  )
}

export default Genre;
