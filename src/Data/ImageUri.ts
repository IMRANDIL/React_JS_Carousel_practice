export const imageUriArray = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
]

export const fetchData = async()=>{
    const controller = new AbortController();
    const jsonData = await fetch('https://picsum.photos/v2/list?page=2&limit=10', {
        signal: controller.signal
    });
    const result = await jsonData.json();
    return result;
  }