import './chatPage.css';
import NewPrompt from '../../components/newPrompt/NewPrompt';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
import React from 'react';

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split('/').pop();

  const { isLoading, error, data } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () =>
      await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  });

  return (
    <div className='chatPage'>
      <div className='wrapper'>
        <div className='chat'>
          {isLoading ? (
            'Loading...'
          ) : error ? (
            `Something went wrong: ${error.message}`
          ) : (
            data?.history?.map((message, i) => (
              <React.Fragment key={i}>
                {message.img && (
                  <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height='200'
                    width='300'
                    transformation={[{ height: '200', width: '300' }]}
                    loading='lazy'
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div className={message.role === 'user' ? 'message user' : 'message'}>
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </React.Fragment>
            ))
          )}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
