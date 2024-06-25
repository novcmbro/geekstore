import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "../styles/route-not-found.css"

export const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="route-not-found">
      <svg width="228" height="126" viewBox="16.12 126.97 467.78 228.08" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="not-found-image" role="img" aria-label={t("routes.not-found-image")}>
        <defs>
          <linearGradient id="linear-gradient-404-page-not-found-9" x1="-25.26" y1="3765.17" x2="339.85" y2="3560.87" gradientTransform="translate(-31.27 3901.49) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#000" stopOpacity="0"/>
            <stop offset=".99" stopColor="#000"/>
          </linearGradient>
          <linearGradient id="linear-gradient-2-404-page-not-found-9" x1="520.69" y1="3568.03" x2="200.03" y2="3841.39" xlinkHref="#linear-gradient-404-page-not-found-9"/>
          <linearGradient id="linear-gradient-3-404-page-not-found-9" x1="376.54" y1="3659.32" x2="26.88" y2="3673.5" xlinkHref="#linear-gradient-404-page-not-found-9"/>
          <linearGradient id="linear-gradient-4-404-page-not-found-9" x1="278.61" y1="277.82" x2="102.31" y2="169.33" gradientTransform="matrix(1,0,0,1,0,0)" xlinkHref="#linear-gradient-404-page-not-found-9"/>
          <linearGradient id="linear-gradient-5-404-page-not-found-9" x1="335.73" y1="3728.17" x2="235.31" y2="3620.67" xlinkHref="#linear-gradient-404-page-not-found-9"/>
          <linearGradient id="linear-gradient-6-404-page-not-found-9" x1="321.45" y1="3644.72" x2="306.73" y2="3714.15" xlinkHref="#linear-gradient-404-page-not-found-9"/>
          <linearGradient id="linear-gradient-7-404-page-not-found-9" x1="277.18" y1="3702.54" x2="280.06" y2="3703.54" xlinkHref="#linear-gradient-404-page-not-found-9"/>
          <linearGradient id="linear-gradient-8-404-page-not-found-9" x1="277.93" y1="3691.43" x2="294.95" y2="3677.48" xlinkHref="#linear-gradient-404-page-not-found-9"/>
        </defs>
        <path className="accent-color" d="M42.9,314.3c-30.11-23.27-35.65-66.55-12.38-96.66,1.66-2.15,3.45-4.2,5.35-6.14,10.2-10.29,23.38-16.9,34.69-25.81,19.56-15.31,34.05-37.42,55.87-49.11,26.28-14.08,58.12-10.37,86.98-3.34,28.86,7.03,57.85,17.09,87.45,14.55,17.62-1.53,34.59-7.49,52.05-10.4,17.46-2.91,36.61-2.38,51.22,7.79,21.27,14.91,26.32,45.04,43.77,64.47,8.45,9.42,19.67,16.12,27.16,26.37,12.04,16.47,11.72,41.2-.72,57.35-15.94,20.65-44.71,23.93-67.92,35.28-12.92,6.32-24.49,15.44-37.86,20.74-28.08,11.13-59.67,3.89-88.46-5.11-28.79-9-58.45-19.82-88.26-15.41-27.83,4.14-52.92,21.32-80.99,23.93-13.03,1.21-27.9-1.11-35.86-12.36-8.56-12.06-20.5-17.24-32.09-26.14Z" opacity={0.18}/>
        <g>
          <path className="accent-color" d="M50.45,250.49q7.56-8.41,16.13-18.49l36.49-42.7c8.07-9.25,11.27-13.45,15.59-20.04h34.52c-.99,9.27-1.44,18.58-1.35,27.9v54.68h4.88c5.59-.05,11.17-.5,16.7-1.35v30.6c-5.47-.67-10.97-1.01-16.48-1h-5.04v8.41c-.16,6.92.29,13.84,1.35,20.68h-34.69c.95-6.96,1.4-13.98,1.35-21.01v-8.24h-47.58c-10.93,0-15.59.17-21.86.67v-30.09ZM120.04,232.68c0-7.57.33-16.81,1.01-24.22-3.34,4.71-5.89,8.07-10.42,13.78l-24.55,29.93h33.96v-19.5Z"/>
          <path d="M50.45,250.49q7.56-8.41,16.13-18.49l36.49-42.7c8.07-9.25,11.27-13.45,15.59-20.04h34.52c-.99,9.27-1.44,18.58-1.35,27.9v54.68h4.88c5.59-.05,11.17-.5,16.7-1.35v30.6c-5.47-.67-10.97-1.01-16.48-1h-5.04v8.41c-.16,6.92.29,13.84,1.35,20.68h-34.69c.95-6.96,1.4-13.98,1.35-21.01v-8.24h-47.58c-10.93,0-15.59.17-21.86.67v-30.09ZM120.04,232.68c0-7.57.33-16.81,1.01-24.22-3.34,4.71-5.89,8.07-10.42,13.78l-24.55,29.93h33.96v-19.5Z" fill="url(#linear-gradient)"/>
          <path className="accent-color" d="M310.03,249.87q7.56-8.41,16.13-18.49l36.49-42.71c5.69-6.28,10.91-12.98,15.59-20.04h34.52c-.99,9.27-1.44,18.59-1.35,27.91v54.65h4.88c5.57-.06,11.13-.51,16.65-1.35v30.6c-5.47-.68-10.97-1.02-16.48-1.01h-5.04v8.41c-.16,6.92.29,13.84,1.35,20.68h-34.64c.95-6.93,1.4-13.92,1.35-20.92v-8.24h-47.58c-10.93,0-15.64.17-21.86.68v-30.15ZM379.63,232.05c0-7.57.33-16.81,1-24.21-3.34,4.7-5.88,8.06-10.42,13.78l-24.49,29.93h33.96l-.04-19.51Z"/>
          <path d="M310.03,249.87q7.56-8.41,16.13-18.49l36.49-42.71c5.69-6.28,10.91-12.98,15.59-20.04h34.52c-.99,9.27-1.44,18.59-1.35,27.91v54.65h4.88c5.57-.06,11.13-.51,16.65-1.35v30.6c-5.47-.68-10.97-1.02-16.48-1.01h-5.04v8.41c-.16,6.92.29,13.84,1.35,20.68h-34.64c.95-6.93,1.4-13.92,1.35-20.92v-8.24h-47.58c-10.93,0-15.64.17-21.86.68v-30.15ZM379.63,232.05c0-7.57.33-16.81,1-24.21-3.34,4.7-5.88,8.06-10.42,13.78l-24.49,29.93h33.96l-.04-19.51Z" fill="url(#linear-gradient-2-404-page-not-found-9)"/>
          <path className="accent-color" d="M201.24,295.3c-5.36-5.28-9.54-11.65-12.25-18.67-4.43-12.35-6.65-25.38-6.56-38.5,0-17.65,4.21-35.97,10.6-46.56,10.25-17.16,27.73-26.57,48.92-26.57,16.31,0,30.6,5.57,40.85,15.59,5.36,5.28,9.54,11.64,12.25,18.66,4.44,12.4,6.66,25.49,6.55,38.67,0,17.66-4.2,36.15-10.59,46.76-10.09,16.83-27.73,26.28-49.09,26.28-16.48,0-30.43-5.41-40.68-15.65ZM216.83,236.8c0,30.06,8.57,45.56,25.22,45.56s24.88-15.13,24.88-45.06-8.74-43.88-25.05-43.88c-15.75,0-25.01,15.97-25.01,43.38h-.04Z"/>
          <path d="M201.24,295.3c-5.36-5.28-9.54-11.65-12.25-18.67-4.43-12.35-6.65-25.38-6.56-38.5,0-17.65,4.21-35.97,10.6-46.56,10.25-17.16,27.73-26.57,48.92-26.57,16.31,0,30.6,5.57,40.85,15.59,5.36,5.28,9.54,11.64,12.25,18.66,4.44,12.4,6.66,25.49,6.55,38.67,0,17.66-4.2,36.15-10.59,46.76-10.09,16.83-27.73,26.28-49.09,26.28-16.48,0-30.43-5.41-40.68-15.65ZM216.83,236.8c0,30.06,8.57,45.56,25.22,45.56s24.88-15.13,24.88-45.06-8.74-43.88-25.05-43.88c-15.75,0-25.01,15.97-25.01,43.38h-.04Z" fill="url(#linear-gradient-3-404-page-not-found-9)"/>
          <path className="accent-color" d="M54.22,249.87q7.57-8.41,16.14-18.49l36.49-42.71c5.69-6.28,10.91-12.98,15.59-20.04h34.52c-.99,9.27-1.44,18.59-1.35,27.91v54.65h4.88c5.59-.06,11.17-.51,16.7-1.35v30.6c-5.47-.68-10.97-1.02-16.48-1.01h-5.04v8.41c-.16,6.92.29,13.84,1.35,20.68h-34.69c.95-6.93,1.4-13.92,1.35-20.92v-8.24h-47.59c-10.92,0-15.59.17-21.86.68v-30.15ZM123.83,232.05c0-7.57.33-16.81,1-24.21-3.34,4.7-5.88,8.06-10.42,13.78l-24.49,29.93h33.91v-19.51Z"/>
          <path className="accent-color" d="M298.8,199.89c-2.71-7.03-6.89-13.39-12.25-18.67-10.26-10.02-24.55-15.58-40.85-15.58-21.19,0-38.67,9.41-48.92,26.55-6.39,10.6-10.6,28.93-10.6,46.57-.08,13.13,2.15,26.16,6.59,38.51,2.71,7.01,6.89,13.38,12.25,18.66,10.26,10.25,24.21,15.63,40.69,15.64,21.34,0,39-9.41,49.09-26.22,6.39-10.61,10.59-29.12,10.59-46.76.1-13.19-2.13-26.29-6.59-38.7ZM251.33,282.4c-.56.15-1.14.26-1.73.35-1.18.19-2.41.28-3.69.28-16.65,0-25.22-15.5-25.22-45.56,0-7.58.7-14.29,2.06-20.02.14-.58.28-1.15.43-1.71,3.72-13.95,11.53-21.68,22.56-21.64,16.3,0,25.05,15.13,25.05,43.89,0,26.43-6.56,41.32-19.46,44.41Z"/>
          <path className="accent-color" d="M314.13,249.87q7.56-8.41,16.13-18.49l36.49-42.71c8.07-9.24,11.27-13.45,15.59-20.04h34.52c-.98,9.28-1.42,18.61-1.31,27.95v54.65h4.88c5.57-.06,11.13-.51,16.65-1.35v30.6c-5.47-.68-10.97-1.02-16.48-1.01h-5.04v8.41c-.16,6.92.29,13.84,1.35,20.68h-34.67c.95-6.94,1.4-13.95,1.35-20.95v-8.24h-47.58c-10.93,0-15.64.17-21.86.68v-30.15ZM383.73,232.05c0-7.57.33-16.81,1.01-24.21-3.34,4.7-5.89,8.06-10.42,13.78l-24.55,29.93h33.96v-19.51Z"/>
        </g>
        <g>
          <path className="accent-color" d="M263.76,247.47c-2.98,12.17-6.75,24.33-12.43,34.93-.56.15-1.14.26-1.73.35-1.18.19-2.41.28-3.69.28-16.65,0-25.22-15.5-25.22-45.56,0-7.58.7-14.29,2.06-20.02.14-.58.28-1.15.43-1.71,3.53-5.15,8.32-8.41,14.36-7.42,3.34.56,6.44,2.61,9.8,3.34,2.92.67,6.01.33,8.9,1.35,5.4,1.92,8.91,8.43,9.68,14.97.77,6.53-.6,13.14-2.16,19.49Z"/>
          <path d="M249.6,282.75c-1.18.19-2.41.28-3.69.28-16.65,0-25.22-15.5-25.22-45.56,0-7.58.7-14.29,2.06-20.02,1.21-.7,2.63-.93,4.01-.69,2.18.51-2.12,12.4,6.4,36.67,6.4,18.24,14.77,17.29,15.88,22.69.34,1.69.62,4.23.56,6.63Z" fill="url(#linear-gradient-4-404-page-not-found-9)"/>
          <path d="M273.14,178.97c2.56,1.87,3.75,5.09,3.02,8.17,4.24.41,8.15,2.49,10.84,5.79,2.39,3.16,3.84,6.93,4.18,10.88.32,3.92.24,7.87-.26,11.78-.06,1.35-.33,2.68-.82,3.94-1.17,2.21-3.26,3.78-5.71,4.29-2.42.48-4.9.6-7.35.35l-5.85-.31c-.19,0-.38-.04-.56-.12-.24-.2-.38-.49-.39-.8-.4-2.39-1.01-3.44-1.45-5.83-1.08-5.05-3.21-9.83-6.23-14.02-.54-.63-.92-1.37-1.11-2.17-.07-1.11.18-2.21.71-3.18.79-1.91,1.45-3.88,1.96-5.89.47-2.4,1.09-4.77,1.84-7.1.77-2.35,2.34-4.36,4.45-5.66" fill="url(#linear-gradient-5-404-page-not-found-9)"/>
          <path d="M270.41,248.9s21.4,1.89,31.17-11.13c3.9-5.17-4.79-29.5-4.79-29.5l-9.88,17.68-15.59,3.54-.92,19.42Z" fill="url(#linear-gradient-6-404-page-not-found-9)"/>
          <path className="skin-color" d="M220.19,210.82c-.58.21-1.14.47-1.67.77-.5.25-.94.62-1.29,1.06-.35.46-.43,1.06-.22,1.59.46.71,1.32,1.07,2.15.9,1.37-.13,2.64-.81,4.01-1.05s2.66-1.18,1.69-2.64-3.3-1.15-4.67-.63Z"/>
          <path className="skin-color" d="M224.56,214.09c-2-.52-4.1.36-5.9,1.37-.43.21-.8.5-1.11.86-.48.38-.56,1.08-.18,1.56.23.29.58.44.95.42.41.04.82.01,1.22-.08l2.77-.48c.64-.08,1.27-.26,1.86-.53,1.26-.73,2.33-2.64.39-3.12Z"/>
          <path className="skin-color" d="M220.69,217.78c-.57.22-1.13.48-1.67.78-.51.27-.95.65-1.29,1.11-.34.45-.42,1.05-.22,1.58.46.71,1.32,1.07,2.15.9,1.37-.13,2.64-.81,4.01-1.05s2.66-1.17,1.69-2.64c-.97-1.47-3.32-1.2-4.67-.69Z"/>
          <path className="skin-color" d="M225.01,220.58c-2.06-.17-3.96,1.11-5.57,2.38-.39.29-.72.64-.97,1.06-.4.47-.34,1.17.12,1.57.27.23.64.32.99.23.41-.03.81-.13,1.18-.29l2.64-.97c.63-.19,1.22-.48,1.75-.86,1.1-.91,1.85-2.94-.14-3.13Z"/>
          <path className="skin-color" d="M284.02,189.15c-3.25-1.55-6.82-2.29-10.41-2.17-.61-.03-1.21.07-1.78.29-.57.25-.93.81-.94,1.43.11.53.41,1,.85,1.31,1.31,1.2,2.79,2.2,4.39,2.98.48.19.92.47,1.29.84.37.38.45.95.19,1.41-.37.51-1.21.53-1.49,1.11-.37.72.56,1.44,1.36,1.57.85.15,1.73.07,2.54-.23.57-.29,1.19-.47,1.83-.51.63.13,1.22.4,1.74.79,1.76,1,7.23,1.04,6.88-2.02-.32-2.83-4.19-5.63-6.44-6.8Z"/>
          <path className="accent-color" d="M257.12,213.7s24.62,10.14,27.43,9.62c2.82-.52-1.74-24.82-1.74-24.82l8.39-3.84s18.93,37.52,3.43,42.98c-9.58,3.21-19.97,3.1-29.48-.31l-8.04-23.63Z"/>
          <path className="skin-color" d="M270.22,199.62c-.09,2.18-.6,4.32-1.51,6.3-1.81,2.99-4.93,4.96-8.41,5.31-1.25.08-2.49.26-3.72.52-1.15.24-2.11,1.03-2.55,2.13-.99,2.4-2.02,4.84-5.21,4.03-.3-.07-.59-.17-.87-.3-1-.47-1.91-1.13-2.66-1.95-.94-.95-1.75-2.01-2.43-3.16-.35-.53-.58-1.13-.69-1.76-.07-.77.03-1.55.27-2.28,1.11-4.45,1.29-9.5,2.87-13.84,1.62-4.4,4.71-8.11,8.75-10.49,4-2.33,9.55-2.36,12.95.81,1.86,1.86,3.03,4.29,3.34,6.9.27,2.59.22,5.2-.13,7.77Z"/>
          <path className="hair-color" d="M243.14,194.05c.21-2.09.2-4.22.61-6.28.31-2.1,1.37-4.03,2.97-5.42.4-.32.85-.58,1.34-.76.43-.16.89-.24,1.34-.37,1.31-.47,2.56-1.09,3.72-1.85,1.76-1.06,3.69-1.81,5.7-2.23,1.36-.21,2.73-.3,4.11-.29,2.52-.04,5.06-.07,7.6-.07.6-.04,1.2.05,1.75.29.61.37,1.05.96,1.24,1.65.48,1.54.48,3.18,0,4.72-.49,1.52-1.15,2.98-1.95,4.36-.39.87-.94,1.66-1.63,2.33-.59-1.02-1.11-2.08-1.65-3.15-1.7,1.77-4.39,2.23-6.84,2.04s-4.85-.82-7.3-.86c-1.18-.12-2.35.22-3.27.97-.55.64-.93,1.4-1.11,2.23-.52,1.83-.94,3.69-1.26,5.57-.29-.55-1.46-1.97-2.07-1.95-.36.03-.68.22-.9.5-1.01,1.11-.51,5.2.42,6.38.19.18.33.4.41.65.04.33-.06.66-.27.92-.52.62-1.31.94-2.12.87-.98,0-1.17-1.87-1.27-2.56-.41-2.57.18-5.17.42-7.69Z"/>
          <path d="M247.05,198.75c-.14-.29-.2-.61-.18-.92.02-.32-.01-.64-.1-.95-.1-.28-.3-.52-.57-.66-.08-.02-.16-.02-.23,0-.13.06-.23.17-.26.31-.39,1.22-.35,2.54.12,3.73.13.43.44.79.86.96.37.07.75-.04,1.01-.31.36-.38.47-.93.29-1.41-.19-.45-.71-.35-.95-.75Z" fill="url(#linear-gradient-7-404-page-not-found-9)"/>
          <path d="M256.58,211.73c-1.15.24-2.11,1.03-2.55,2.13-.99,2.4-2.02,4.84-5.21,4.03-.3-.07-.59-.17-.87-.3-.27-.23-.49-.52-.65-.84-.29-.76-.26-1.6.09-2.34.79-1.91,2.63-3.18,4.7-3.23.85.04,1.7.15,2.53.33.51.07,1.11,0,1.58.06.14.02.26.08.38.16Z" fill="url(#linear-gradient-8-404-page-not-found-9)"/>
        </g>
      </svg>
      <h2 className="typography-title-lg">{t("routes.not-found")}</h2>
      <p>{t("routes.not-found-description")}</p>
      <Link to="/" className="button-filled">{t("routes.back-home")}</Link>
    </div>
  )
}