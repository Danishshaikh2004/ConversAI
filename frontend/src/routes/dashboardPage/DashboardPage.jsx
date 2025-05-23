import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import './dashboardPage.css'
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['userChats'] })
      navigate(`/dashboard/chats/${id}`)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text)
  };

  return (
    <div>
      <div className="dashboardPage">
        <div className="texts">
          <div className="logo">
            <img src="https://conversai-img.s3.us-east-1.amazonaws.com/logo.png" alt="" />
            <h1>ConversAI</h1>
          </div>
          <div className="options">
            <div className="option">
              <img src="https://conversai-img.s3.us-east-1.amazonaws.com/chat.png" alt="" />
              <span>Create a New Chat</span>
            </div>
            <div className="option">
              <img src="https://conversai-img.s3.us-east-1.amazonaws.com/image.png" alt="" />
              <span>Analyze Images</span>
            </div>
            <div className="option">
              <img src="https://conversai-img.s3.us-east-1.amazonaws.com/code.png" alt="" />
              <span>Help me with my code</span>
            </div>
          </div>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <input type="text" name='text' placeholder='Ask me anything...' />
            <button type="submit">
              <img src="https://conversai-img.s3.us-east-1.amazonaws.com/arrow.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;
