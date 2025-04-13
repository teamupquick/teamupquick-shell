type LoadRemoteModuleOptions = {
  remoteName: string;
  remoteUrl: string;
  moduleName: string;
};

// 聲明全局變量
declare global {
  interface Window {
    [key: string]: any;
    __webpack_share_scopes__: { default: any };
  }
}

export const loadRemoteModule = ({
  remoteName,
  remoteUrl,
  moduleName,
}: LoadRemoteModuleOptions) => {
  return new Promise((resolve, reject) => {
    // 檢查該遠端是否已經載入
    if (window[remoteName]) {
      return resolve(getRemoteModule(remoteName, moduleName));
    }

    const script = document.createElement("script");
    script.src = `${remoteUrl}/remoteEntry.js`;
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // 初始化作用域共享
      window[remoteName].init(window.__webpack_share_scopes__.default);
      resolve(getRemoteModule(remoteName, moduleName));
    };

    script.onerror = (error) => {
      reject(new Error(`無法載入遠端模組 ${remoteName}: ${error}`));
    };

    document.head.appendChild(script);
  });
};

const getRemoteModule = (remoteName: string, moduleName: string) => {
  return window[remoteName].get(moduleName).then((factory: any) => {
    const Module = factory();
    return Module;
  });
}; 