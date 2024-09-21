import { request, APIRequestContext ,test} from '@playwright/test';

const baseUrl = 'https://reqres.in/';

export async function sendAndGetResponse(userData: { email: string; password: string }, path: string) {
    const context: APIRequestContext = await request.newContext({
        baseURL: baseUrl,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
        }
    });

  
    const response = await context.post(path, {
        data: userData 
    });

  
    // if (!response.ok()) {
    //     throw new Error(`Request failed with status ${response.status()}`);
    // }

  
    const responseBody = await response.json();
    await logInfoInHTML('Request endpoint',baseUrl+path)
    await logInfoInHTML('Request body', JSON.stringify(userData))
    await logInfoInHTML('Response status', response.status().toLocaleString())
    await logInfoInHTML('Response body', JSON.stringify(responseBody))

    

    return response;
    await context.dispose();
}

export async function logInfoInHTML(title: string, value: string) {
    test.info().annotations.push(({
        type: title,
        description: value
    }))
}

