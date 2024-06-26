import { useContext } from "react";
import { ApiContext, ApiContextType, RequestFunction } from "./common";
import { SessionType } from "./types/session";
import { UserType } from "./types/user";
import { useApiNamespace_userAuth } from "./namespaces/userAuth";
import { useApiNamespace_connections } from "./namespaces/connections";
import { useApiNamespace_user } from "./namespaces/user";
import { useApiNamespace_projects } from "./namespaces/project";

export function useApi(): ApiContextType {
    return useContext(ApiContext);
}

export function useApiStatus(): ApiContextType["status"] {
    return useApi().status;
}

export function useApiError(): string | null {
    const api = useApi();
    return api.status === "error" ? api.reason : null;
}

export function useSession(): SessionType | null {
    const api = useApi();
    if (api.status === "ready") {
        return api.session;
    } else {
        return null;
    }
}

export function useUser(): UserType | null {
    const api = useApi();
    if (api.status === "ready" && api.user) {
        return api.user;
    } else {
        return null;
    }
}

export function useApiRequest(): RequestFunction {
    const api = useApi();
    if (api.status === "ready") {
        return api.request;
    } else {
        return async () => ({ success: false, data: null as any, code: 0 });
    }
}

export function useApiReload(): () => Promise<void> {
    const api = useApi();
    if (api.status === "ready") {
        return api.reload;
    } else {
        return async () => {};
    }
}

export function useApiMethods() {
    const ns_userAuth = useApiNamespace_userAuth();
    const ns_connections = useApiNamespace_connections();
    const ns_user = useApiNamespace_user();
    const ns_projects = useApiNamespace_projects();
    return {
        userAuth: ns_userAuth,
        user: ns_user,
        connections: ns_connections,
        projects: ns_projects,
    };
}
