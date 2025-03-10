import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { IWrappedComponentProps } from '@/types/common'
import { forwardRef } from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import { $user } from '@/context/user'
import { useRouter } from 'next/router'
import { logoutFx } from '@/app/api/auth'
import styles from '@/styles/profileDropdown/index.module.scss'

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const router = useRouter()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleProfileDropdown = () => setOpen(!open)

    const handleLogout = async () => {
      await logoutFx('/users/logout')
      router.push('/')
    }

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropdown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__user}>
                <span
                  className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                >
                  {user.username}
                </span>
                <span
                  className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                >
                  {user.email}
                </span>
              </li>

              <li className={styles.profile__dropdown__item}>
                <button className={styles.profile__dropdown__item__btn}>
                  <span
                    className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                    onClick={handleLogout}
                  >
                    Выйти
                  </span>
                  <span
                    className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                  >
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropdown.displayName = 'ProfileDropdown'

export default withClickOutside(ProfileDropdown)
