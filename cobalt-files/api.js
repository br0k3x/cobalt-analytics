// cobalt/api/src/core
// Line 1-6
import { trackServiceUsage } from "./analytics-client.js"; // +
import cors from "cors";
import http from "node:http";
import ipaddr from "ipaddr.js";
import rateLimit from "express-rate-limit";

// Line 277-289
        try {
            if (parsed.service) { 
                trackServiceUsage(parsed.service);
            } else if (parsed.host) {                          // + this entire if block
                trackServiceUsage(parsed.host);
            }
            const result = await match({
                host: parsed.host,
                patternMatch: parsed.patternMatch,
                params: normalizedRequest,
                authType: req.authType ?? "none",
            });
        } catch (err) {}