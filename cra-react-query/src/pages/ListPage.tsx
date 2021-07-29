import Loading from 'components/Loading'
import { usePosts } from 'hooks/useLocal'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ListPage: React.FC = () => {
  const history = useHistory()
  // const { data, isLoading } = useGetListApi('posts')
  const { data, isLoading } = usePosts({ limit: 1000 })
  // console.log(testData)

  return (
    <Wrapper>
      <Link to="post">등록하러가기</Link>
      {isLoading && <Loading />}
      {data &&
        data.length > 0 &&
        data.map((list: any) => (
          <Post key={list.no} onClick={() => history.push(`/post/${list.no}`)}>
            <span>{list.no}</span>
            {list.title}
          </Post>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  flex-direction: column;

  a {
    text-decoration: none;
    border-bottom: 1px solid;
    font-size: 1.5rem;
    &:visited {
      color: #000;
    }
  }
`

const Post = styled.p`
  width: 400px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    color: blue;
  }

  span {
    font-weight: bold;
    margin-right: 10px;
    color: #000;
  }
`

export default ListPage
