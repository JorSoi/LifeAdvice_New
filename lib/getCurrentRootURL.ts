const getCurrentRootURL = () : string => {
    let url = process?.env?.NEXT_PUBLIC_VERCEL_ENV == 'production' ? 'https://life-advice-new.vercel.app/' : 'http://localhost:3000/';
    return url
  }

  export default getCurrentRootURL;