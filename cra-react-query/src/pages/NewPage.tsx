import Loading from 'components/Loading'
import { usePostCreate } from 'hooks/useLocal'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const NewPage: React.FC = () => {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutateAsync, isLoading } = usePostCreate()

  const onUpdatePost = async (data: any) => {
    const { title, contents } = data
    const param = {
      title,
      contents,
    }
    const rs = await mutateAsync(param)
    if (rs) {
      history.goBack()
    }
  }

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <form>
        <h3>New Post</h3>
        <input
          placeholder={'title'}
          {...register('title', { required: true })}
        />
        {errors.title && <span>Title is required</span>}
        <input
          placeholder={'contents'}
          {...register('contents', { required: true })}
        />
        {errors.contents && <span>Contents is required</span>}
        <button onClick={handleSubmit(onUpdatePost)}>Add</button>
      </form>
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

export default NewPage
