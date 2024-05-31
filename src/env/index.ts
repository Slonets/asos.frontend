const REMOTE_HOST_NAME: string = import.meta.env.VITE_BASE_URL as string;

console.log("Хост",REMOTE_HOST_NAME);
const APP_ENV={
    BASE_URL:REMOTE_HOST_NAME
}

export { APP_ENV };