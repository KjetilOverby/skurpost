import React from "react";
import HeaderComponent from "../postoppsett/reusable/HeaderComponent";

interface StartPageRoleProps {
  colorMode: string;
}

const StartPageRole: React.FC<StartPageRoleProps> = ({ colorMode }) => {
  return (
    <div>
      <main className="min-h-screen bg-white">
        <HeaderComponent colorMode={colorMode} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4"></div>
          <div className="w-96">
            <img
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/pw/AP1GczNnwVVmIk7oPqbRfJeNiCVthHHDPKq8JiNBvrL7ROLKkhNhIg6fyIUgvVz6OHdg9DadaToKfpCB_au8ZlkSgd4N2hka355A25MBRzuI6cYWCRU9ZK332u8FVBGE-lKvY5e4SMmhgisDgLkP6lUoCe4AhehWYiF8shBg5B6BuRqEuSzFtUt4xhUjW8hFpf-mQXN0ZgGLWs_g8LOkB44_6Ir0P1_5dTcVt5BJ_SzFp4dMJEmbRveb5xYnQmOGu5YR4Y2Sb6YfUytUy9bNn3YnPb_Q0CipZ_TBngZhUzcKxxxCJOJY26g4U8FERg2BvWCSKx0lcthT2Z4jrgXqZ4ey2BxPhmq8N6dkiUXXCktcRsiqLg_lgeeqzm9Skin25k5jLDhvwjoSuLQiCCIJytJkNmSnZ1ZEzgLOau4EvUKs2e-ijmP8Ohp1FHJk9oJ8iwcblKLseIQNVRNwbkqjZ__Y_u_wxxZIdv98wAVfl3f2OaAkKFe9GhdQe0klktjX1q-heS7_erVdp5zXBODkUmgdUZBltdoJL7R5Ge1IuTl5R-Ol6BhDmi4VgGSLTpGCCjp2ZZbBJfg6XFk66eh4bqFMOS8I8SopBsrU_KnQHX7Ftcjt2cOBG5Tv_4HnZGZK1hghMPpcyp2CwM1uAEbaUVmL90ZWtfvcsDoW1xj_vytSzCtocpP3NpfJatUm0Y0fEnvw4yR0sLaWPkn_QkHct0pjSb1Jyo9kgPR8RoKGhEvdpEuEmFxf-rAmblfz0TOrwsrQXcXjDfxo9p-gBBi_kEJRi44zychpTAP6nWLyF4ugPJJ9laJFpEGCQzl6zdVxSbJdzjPNBrAxGmc3oFSk6NBQQI4tR4DYIxLWmtN9jtV696_Il8n-wbg70WA0f4DLier4ViffancLDgBG5a5xjfZZU8UrnfP2rdZzW5sDEI2OjcQqf40f-3fNO-IJv4k_rg=w2579-h475-s-no?authuser=0"
              alt=""
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartPageRole;
