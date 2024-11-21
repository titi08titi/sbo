import Loader from '#components/common/Loader'
import { User } from '#utils/global'

type Props = {
  user: User
  loading: boolean
}

export default function HelloWorld({ user, loading }: Props) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          Welcome {user?.name} to <a href="#">SamBot !</a>
        </div>
      )}
    </div>
  )
}
