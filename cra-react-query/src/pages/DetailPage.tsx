import Loading from 'components/Loading'
import { usePost, usePostUpdate } from 'hooks/useLocal'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import styled from 'styled-components'

const DetailPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { id: no }: any = useParams()
  const { data, isLoading } = usePost(no)
  const { mutateAsync, isLoading: isPosting } = usePostUpdate()

  const onUpdatePost = async (data: any) => {
    const { title, contents } = data
    const param = {
      no,
      title,
      contents,
    }
    await mutateAsync(param)
  }

  return (
    <Wrapper>
      {(isLoading || isPosting) && <Loading />}
      {data && (
        <form>
          <h3>{`${data.no}. ${data.title}`}</h3>
          <input
            placeholder={'title'}
            defaultValue={data.title}
            {...register('title', { required: true })}
          />
          {errors.title && <span>Title is required</span>}
          <input
            placeholder={'contents'}
            defaultValue={data.contents}
            {...register('contents', { required: true })}
          />
          <button onClick={handleSubmit(onUpdatePost)}>Save</button>
        </form>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  div ~ div {
    margin-top: 10px;
  }

  span {
    color: red;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    input ~ input,
    input ~ button,
    button ~ input {
      margin-top: 5px;
    }
  }

  input {
    outline: none;
    padding: 10px;
    min-width: 300px;
  }
`

export default DetailPage
