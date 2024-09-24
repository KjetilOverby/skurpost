import React, { useContext, useState, useEffect } from 'react';
import HeaderComponent from '~/components/postoppsett/reusable/HeaderComponent';
import ColorTheme from '~/components/innstillinger/ColorTheme';
import { api } from '~/utils/api';
import { PostInfoContext } from '~/components/context';

const Innstillinger = ({ colorMode }) => {
  const context = useContext(PostInfoContext);
  const [currentTheme, setCurrentTheme] = useState(''); // Add state for theme

  const { data: posts, isLoading, error } = api.settings.getByUser.useQuery({
    user: 'Kjetil Øverby'
  });

  useEffect(() => {
setCurrentTheme(posts?.theme);
  }, [posts]);

  const createSettings = api.settings.createPost.useMutation({
    onSuccess: () => {
      void ctx.settings.update.invalidate();
      console.log('success');
    },
  });

  const handleCreate = async () => {
    try {
      const theme = 'lightmode';
      const sawType = 'mkv';
      const fonts = '';
      const visPakking = true;
      const visMiniListe = true;
      const response = await createSettings.mutateAsync({
        theme,
        fonts,
        sawType,
        visPakking,
        visMiniListe,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTheme = api.settings.updateTheme.useMutation({
    onSuccess: (data) => {
      setCurrentTheme(data.theme); // Update state with new theme
      void ctx.settings.updateTheme.invalidate();
      console.log('Theme updated successfully');
    },
  });

  const handleUpdateTheme = async (newTheme) => {
    try {
      const userId = 'user-id'; // Replace with actual user ID
      const response = await updateTheme.mutateAsync({
        userId,
        theme: newTheme,
      });
      console.log(response);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };
  console.log(currentTheme);
  

  return (
    <div data-theme={currentTheme} className="bg-base-100 min-h-screen">
      <HeaderComponent />
      <div className="mx-96 mt-5">
        <ColorTheme update={handleUpdateTheme} theme={posts?.theme} />
      </div>
    </div>
  );
};

export default Innstillinger;