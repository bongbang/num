const dev = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://op67d2tcqa.execute-api.us-east-1.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_qFgw9nukN',
    APP_CLIENT_ID: '34uah4cj0k09v318ojec5i89m8',
    IDENTITY_POOL_ID: 'us-east-1:e123c07d-a936-414f-ad0c-687a95037371'
  }
};

const prod = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://eoxsnrkoqk.execute-api.us-east-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_arDDU199G',
    APP_CLIENT_ID: '71b6nhual3en59gis6gge65pub',
    IDENTITY_POOL_ID: 'us-east-1:fd603a19-6de3-44cc-bba8-14a2efbe765e'
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
