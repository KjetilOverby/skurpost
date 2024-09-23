import React, {useContext} from 'react'
import HeaderComponent from '~/components/postoppsett/reusable/HeaderComponent'
import ColorTheme from '~/components/innstillinger/ColorTheme'
import { api } from "~/utils/api";
import { PostInfoContext } from "~/components/context";


const innstillinger = ({colorMode}) => {
    const context = useContext(PostInfoContext);

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
            /*  console.log(response); */
          
          } catch (error) {
            console.error(error);
          }
      }

return (

<div data-theme={colorMode} className='bg-base-100 min-h-screen'>
 <HeaderComponent />
 <div className='mx-96 mt-5'>
  
 <ColorTheme update={handleCreate} />
 </div>
</div>



)
}

export default innstillinger