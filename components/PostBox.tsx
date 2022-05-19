import { useMutation } from '@apollo/client'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import client from '../apollo-client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutation'
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import Avatar from './Avatar'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}
function PostBox() {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST)
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
    const notification = toast.loading('Creating a new post...')
    try {
      // Query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0

      if (!subredditExists) {
        // create subreddit

        console.log('Subreddit is new! -> creating a NEW subreddit!')

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        console.log('Creating a post...', formData)
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log('New post added', newPost)
      } else {
        // use existing subreddit

        console.log('Using existing subreddit!')
        console.log(getSubredditListByTopic)

        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log('New Post was added', newPost)
      }

      // After post has been added
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')

      toast.success('New Post Created', {
        id: notification,
      })
    } catch (error) {
      toast.error('Whoops something went wrong', {
        id: notification,
      })
    }
  })
  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50  rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar large />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Create a post entering a title' : 'Sign in to post'
          }
        />
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          } `}
        />
        <LinkIcon className={`h-6 text-gray-300 `} />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* body */}
          <div className="flex items-center px-2">
            <p className="min-w-[80px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (Optional)"
            />
          </div>

          {/* subreddit */}
          <div className="flex items-center px-2">
            <p className="min-w-[80px]">Subreddit</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('subreddit', { required: true })}
              type="text"
              placeholder="i.e. react.js"
            />
          </div>

          <div>
            {imageBoxOpen && (
              <div className="flex items-center px-2">
                <p className="min-w-[80px]">Image URL</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register('postImage')}
                  type="text"
                  placeholder="Optional..."
                />
              </div>
            )}
          </div>
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'requires' && (
                <p>= A Post Title is required</p>
              )}
              {errors.subreddit?.type === 'requires' && (
                <p>= A Post Title is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
