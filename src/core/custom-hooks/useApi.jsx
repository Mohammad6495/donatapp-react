import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const apiCaller = async ({
  api,
  apiArguments = null,
  onSuccess,
  onError,
  onEnd,
  onStart,
  toastMessage = true,
  onErrorMessage,
  onSuccessMessage,
}) => {
  if (onStart) {
    onStart();
  }
  return await api(apiArguments)
    .then((resp) => {
      if (resp.status === 200) {
        if (toastMessage && onSuccessMessage) {
          toast.success(onSuccessMessage);
        }
        if (onSuccess) {
          onSuccess(resp);
        }
        if (onEnd) onEnd();
        return { data: resp.data, status: resp.status };
      } else {
        if (toastMessage && onErrorMessage) {
          toast.error(onErrorMessage);
        }
        if (onError) {
          onError();
        }
        if (onEnd) onEnd();
        return { data: null, status: resp.status };
      }
    })
    .catch((ex) => {
      if (toastMessage && onErrorMessage) {
        toast.error(onErrorMessage);
      }
      if (onError) {
        onError(ex);
      }
      if (onEnd) onEnd();
      return { data: null, status: ex?.response?.status };
    });
};

export const useApi = ({
  api,
  waitForAuhorize = false,
  isAuthorized = false,
  waitForArguments = false,
  apiArguments = null,
  toastMessage = true,
  onSuccess,
  onError,
  onEnd,
  onStart,
  onErrorMessage = null,
  onSuccessMessage = null,
}) => {
  const [responseData, setResponseData] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const call = async () => {
      setIsLoading(true);
      const { data, status } = await apiCaller({
        api,
        apiArguments,
        toastMessage,
        onErrorMessage,
        onSuccessMessage,
        onError,
        onSuccess,
        onEnd,
        onStart,
      });
      setResponseData(data);
      setResponseStatus(status);
      setIsLoading(false);
    };

    if (!waitForAuhorize) {
      if (!waitForArguments) {
        call();
      }
      if (waitForArguments && apiArguments) {
        call();
      }
    } else {
      if (!waitForArguments && isAuthorized) {
        call();
      }
      if (waitForArguments && apiArguments && isAuthorized) {
        call();
      }
    }
  }, [waitForArguments, apiArguments, waitForAuhorize, isAuthorized]);

  return { responseData, isLoading, responseStatus };
};
