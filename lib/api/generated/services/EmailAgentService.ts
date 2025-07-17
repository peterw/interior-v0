/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutomatedReplySchedule } from '../models/AutomatedReplySchedule';
import type { AutomatedReplyScheduleCreate } from '../models/AutomatedReplyScheduleCreate';
import type { AutomatedReplyScheduleCreateRequest } from '../models/AutomatedReplyScheduleCreateRequest';
import type { AutomatedReplyScheduleRequest } from '../models/AutomatedReplyScheduleRequest';
import type { AutomatedReplyScheduleUpdate } from '../models/AutomatedReplyScheduleUpdate';
import type { AutomatedReplyScheduleUpdateRequest } from '../models/AutomatedReplyScheduleUpdateRequest';
import type { AutoReplyConfig } from '../models/AutoReplyConfig';
import type { AutoReplyConfigRequest } from '../models/AutoReplyConfigRequest';
import type { Conversation } from '../models/Conversation';
import type { ConversationAIReplyResponse } from '../models/ConversationAIReplyResponse';
import type { ConversationAISuggestRequestRequest } from '../models/ConversationAISuggestRequestRequest';
import type { ConversationAISuggestResponse } from '../models/ConversationAISuggestResponse';
import type { ConversationArchiveRequest } from '../models/ConversationArchiveRequest';
import type { ConversationArchiveResponse } from '../models/ConversationArchiveResponse';
import type { ConversationAutomatedReplyRequest } from '../models/ConversationAutomatedReplyRequest';
import type { ConversationAutomatedReplyResponse } from '../models/ConversationAutomatedReplyResponse';
import type { ConversationDraftDetailResponse } from '../models/ConversationDraftDetailResponse';
import type { ConversationDraftListResponse } from '../models/ConversationDraftListResponse';
import type { ConversationListResponse } from '../models/ConversationListResponse';
import type { ConversationRequest } from '../models/ConversationRequest';
import type { ConversationTagRemoveRequestRequest } from '../models/ConversationTagRemoveRequestRequest';
import type { ConversationTagRemoveResponse } from '../models/ConversationTagRemoveResponse';
import type { ConversationTagRequestRequest } from '../models/ConversationTagRequestRequest';
import type { ConversationTagResponse } from '../models/ConversationTagResponse';
import type { ConversationToggleArchiveResponse } from '../models/ConversationToggleArchiveResponse';
import type { EmailAccount } from '../models/EmailAccount';
import type { EmailAccountRequest } from '../models/EmailAccountRequest';
import type { EmailCampaign } from '../models/EmailCampaign';
import type { EmailCampaignObjectiveAssignRequest } from '../models/EmailCampaignObjectiveAssignRequest';
import type { EmailCampaignObjectiveRemoveRequest } from '../models/EmailCampaignObjectiveRemoveRequest';
import type { EmailCampaignRequest } from '../models/EmailCampaignRequest';
import type { Message } from '../models/Message';
import type { MessageRequest } from '../models/MessageRequest';
import type { PaginatedAutomatedReplyScheduleList } from '../models/PaginatedAutomatedReplyScheduleList';
import type { PaginatedAutoReplyConfigList } from '../models/PaginatedAutoReplyConfigList';
import type { PaginatedEmailAccountList } from '../models/PaginatedEmailAccountList';
import type { PaginatedEmailCampaignList } from '../models/PaginatedEmailCampaignList';
import type { PaginatedMessageList } from '../models/PaginatedMessageList';
import type { PaginatedReplyLogList } from '../models/PaginatedReplyLogList';
import type { PaginatedReplyObjectiveList } from '../models/PaginatedReplyObjectiveList';
import type { PaginatedTagList } from '../models/PaginatedTagList';
import type { PatchedAutomatedReplyScheduleUpdateRequest } from '../models/PatchedAutomatedReplyScheduleUpdateRequest';
import type { PatchedAutoReplyConfigRequest } from '../models/PatchedAutoReplyConfigRequest';
import type { PatchedConversationRequest } from '../models/PatchedConversationRequest';
import type { PatchedEmailAccountRequest } from '../models/PatchedEmailAccountRequest';
import type { PatchedEmailCampaignRequest } from '../models/PatchedEmailCampaignRequest';
import type { PatchedMessageRequest } from '../models/PatchedMessageRequest';
import type { PatchedReplyLogRequest } from '../models/PatchedReplyLogRequest';
import type { PatchedReplyObjectiveRequest } from '../models/PatchedReplyObjectiveRequest';
import type { PatchedTagRequest } from '../models/PatchedTagRequest';
import type { ReplyLog } from '../models/ReplyLog';
import type { ReplyLogRequest } from '../models/ReplyLogRequest';
import type { ReplyObjective } from '../models/ReplyObjective';
import type { ReplyObjectiveRequest } from '../models/ReplyObjectiveRequest';
import type { Tag } from '../models/Tag';
import type { TagCreate } from '../models/TagCreate';
import type { TagCreateRequest } from '../models/TagCreateRequest';
import type { TagRequest } from '../models/TagRequest';
import type { ThreadMessageList } from '../models/ThreadMessageList';
import type { ThreadMessageSendRequest } from '../models/ThreadMessageSendRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EmailAgentService {
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param page A page number within the paginated result set.
     * @returns PaginatedEmailAccountList
     * @throws ApiError
     */
    public static emailAgentAccountsList(
        page?: number,
    ): CancelablePromise<PaginatedEmailAccountList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/accounts/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param requestBody
     * @returns EmailAccount
     * @throws ApiError
     */
    public static emailAgentAccountsCreate(
        requestBody: EmailAccountRequest,
    ): CancelablePromise<EmailAccount> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/accounts/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this Email account.
     * @returns EmailAccount
     * @throws ApiError
     */
    public static emailAgentAccountsRetrieve(
        id: number,
    ): CancelablePromise<EmailAccount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/accounts/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this Email account.
     * @param requestBody
     * @returns EmailAccount
     * @throws ApiError
     */
    public static emailAgentAccountsUpdate(
        id: number,
        requestBody: EmailAccountRequest,
    ): CancelablePromise<EmailAccount> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/accounts/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this Email account.
     * @param requestBody
     * @returns EmailAccount
     * @throws ApiError
     */
    public static emailAgentAccountsPartialUpdate(
        id: number,
        requestBody?: PatchedEmailAccountRequest,
    ): CancelablePromise<EmailAccount> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/accounts/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this Email account.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentAccountsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/accounts/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Save or update credentials for the chosen provider - validates API key by checking unread emails count.
     * @param requestBody
     * @returns EmailAccount
     * @throws ApiError
     */
    public static emailAgentAccountsConnectCreate(
        requestBody: EmailAccountRequest,
    ): CancelablePromise<EmailAccount> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/accounts/connect/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test connection to external provider without saving credentials
     * @param requestBody
     * @returns EmailAccount
     * @throws ApiError
     */
    public static emailAgentAccountsTestConnectionCreate(
        requestBody: EmailAccountRequest,
    ): CancelablePromise<EmailAccount> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/accounts/test-connection/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param page A page number within the paginated result set.
     * @returns PaginatedAutoReplyConfigList
     * @throws ApiError
     */
    public static emailAgentAutoReplyConfigList(
        page?: number,
    ): CancelablePromise<PaginatedAutoReplyConfigList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/auto-reply-config/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param requestBody
     * @returns AutoReplyConfig
     * @throws ApiError
     */
    public static emailAgentAutoReplyConfigCreate(
        requestBody: AutoReplyConfigRequest,
    ): CancelablePromise<AutoReplyConfig> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/auto-reply-config/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this auto reply config.
     * @returns AutoReplyConfig
     * @throws ApiError
     */
    public static emailAgentAutoReplyConfigRetrieve(
        id: number,
    ): CancelablePromise<AutoReplyConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/auto-reply-config/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this auto reply config.
     * @param requestBody
     * @returns AutoReplyConfig
     * @throws ApiError
     */
    public static emailAgentAutoReplyConfigUpdate(
        id: number,
        requestBody: AutoReplyConfigRequest,
    ): CancelablePromise<AutoReplyConfig> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/auto-reply-config/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this auto reply config.
     * @param requestBody
     * @returns AutoReplyConfig
     * @throws ApiError
     */
    public static emailAgentAutoReplyConfigPartialUpdate(
        id: number,
        requestBody?: PatchedAutoReplyConfigRequest,
    ): CancelablePromise<AutoReplyConfig> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/auto-reply-config/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this auto reply config.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentAutoReplyConfigDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/auto-reply-config/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for managing automated reply schedules.
     * @param page A page number within the paginated result set.
     * @returns PaginatedAutomatedReplyScheduleList
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesList(
        page?: number,
    ): CancelablePromise<PaginatedAutomatedReplyScheduleList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/automated-schedules/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * ViewSet for managing automated reply schedules.
     * @param requestBody
     * @returns AutomatedReplyScheduleCreate
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesCreate(
        requestBody?: AutomatedReplyScheduleCreateRequest,
    ): CancelablePromise<AutomatedReplyScheduleCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/automated-schedules/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing automated reply schedules.
     * @param id A unique integer value identifying this Automated Reply Schedule.
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesRetrieve(
        id: number,
    ): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/automated-schedules/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for managing automated reply schedules.
     * @param id A unique integer value identifying this Automated Reply Schedule.
     * @param requestBody
     * @returns AutomatedReplyScheduleUpdate
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesUpdate(
        id: number,
        requestBody?: AutomatedReplyScheduleUpdateRequest,
    ): CancelablePromise<AutomatedReplyScheduleUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/automated-schedules/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing automated reply schedules.
     * @param id A unique integer value identifying this Automated Reply Schedule.
     * @param requestBody
     * @returns AutomatedReplyScheduleUpdate
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesPartialUpdate(
        id: number,
        requestBody?: PatchedAutomatedReplyScheduleUpdateRequest,
    ): CancelablePromise<AutomatedReplyScheduleUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/automated-schedules/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing automated reply schedules.
     * @param id A unique integer value identifying this Automated Reply Schedule.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/automated-schedules/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Pause a specific schedule.
     * @param id A unique integer value identifying this Automated Reply Schedule.
     * @param requestBody
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesPauseCreate(
        id: number,
        requestBody?: AutomatedReplyScheduleRequest,
    ): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/automated-schedules/{id}/pause/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Resume a specific schedule.
     * @param id A unique integer value identifying this Automated Reply Schedule.
     * @param requestBody
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesResumeCreate(
        id: number,
        requestBody?: AutomatedReplyScheduleRequest,
    ): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/automated-schedules/{id}/resume/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get schedules that are due soon.
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesDueSoonRetrieve(): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/automated-schedules/due-soon/',
        });
    }
    /**
     * Get automated reply schedule statistics.
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static emailAgentAutomatedSchedulesStatsRetrieve(): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/automated-schedules/stats/',
        });
    }
    /**
     * List campaigns, triggering background sync for better performance
     * @param page A page number within the paginated result set.
     * @returns PaginatedEmailCampaignList
     * @throws ApiError
     */
    public static emailAgentCampaignsList(
        page?: number,
    ): CancelablePromise<PaginatedEmailCampaignList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/campaigns/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailAgentCampaignsCreate(
        requestBody: EmailCampaignRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/campaigns/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this email campaign.
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailAgentCampaignsRetrieve(
        id: number,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/campaigns/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this email campaign.
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailAgentCampaignsUpdate(
        id: number,
        requestBody: EmailCampaignRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/campaigns/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this email campaign.
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailAgentCampaignsPartialUpdate(
        id: number,
        requestBody?: PatchedEmailCampaignRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/campaigns/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this email campaign.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentCampaignsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/campaigns/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Refresh campaign data from external provider
     * @param id A unique integer value identifying this email campaign.
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailAgentCampaignsRefreshCreate(
        id: number,
        requestBody: EmailCampaignRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/campaigns/{id}/refresh/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Assign objective to campaign
     * Assign a default objective to a campaign by providing the campaign ID and objective ID.
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailCampaignAssignObjective(
        requestBody: EmailCampaignObjectiveAssignRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/campaigns/assign-objective/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove the default objective from a campaign by providing the campaign ID.
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailCampaignRemoveObjective(
        requestBody: EmailCampaignObjectiveRemoveRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/campaigns/remove-objective/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Manually trigger background sync of campaigns from external providers
     * @param requestBody
     * @returns EmailCampaign
     * @throws ApiError
     */
    public static emailAgentCampaignsSyncCreate(
        requestBody: EmailCampaignRequest,
    ): CancelablePromise<EmailCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/campaigns/sync/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get analytics for a specific campaign or multiple campaigns
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyAnalyticsCampaignAnalyticsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/analytics/campaign_analytics/',
        });
    }
    /**
     * Get analytics for multiple campaigns
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyAnalyticsMultipleCampaignsAnalyticsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/analytics/multiple_campaigns_analytics/',
        });
    }
    /**
     * List emails with optional filtering
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyEmailsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/emails/',
        });
    }
    /**
     * Get a specific email by ID
     * @param id
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyEmailsRetrieve2(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/emails/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all emails for a campaign (paginated automatically)
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyEmailsAllEmailsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/emails/all_emails/',
        });
    }
    /**
     * Reply to an email
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyEmailsReplyCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/instantly/emails/reply/',
        });
    }
    /**
     * Get campaign emails along with campaign analytics
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyIntegratedCampaignEmailsWithAnalyticsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/integrated/campaign_emails_with_analytics/',
        });
    }
    /**
     * Get campaign details along with its analytics
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentInstantlyIntegratedCampaignWithAnalyticsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/instantly/integrated/campaign_with_analytics/',
        });
    }
    /**
     * List messages, triggering background email sync for better performance
     * @param page A page number within the paginated result set.
     * @returns PaginatedMessageList
     * @throws ApiError
     */
    public static emailAgentMessagesList(
        page?: number,
    ): CancelablePromise<PaginatedMessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/messages/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param requestBody
     * @returns Message
     * @throws ApiError
     */
    public static emailAgentMessagesCreate(
        requestBody: MessageRequest,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/messages/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this message.
     * @returns Message
     * @throws ApiError
     */
    public static emailAgentMessagesRetrieve(
        id: number,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/messages/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this message.
     * @param requestBody
     * @returns Message
     * @throws ApiError
     */
    public static emailAgentMessagesUpdate(
        id: number,
        requestBody: MessageRequest,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/messages/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this message.
     * @param requestBody
     * @returns Message
     * @throws ApiError
     */
    public static emailAgentMessagesPartialUpdate(
        id: number,
        requestBody?: PatchedMessageRequest,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/messages/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this message.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentMessagesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/messages/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Dispatch an email reply.
     * @param id A unique integer value identifying this message.
     * @param requestBody
     * @returns Message
     * @throws ApiError
     */
    public static emailAgentMessagesSendCreate(
        id: number,
        requestBody: MessageRequest,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/messages/{id}/send/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Manually trigger background email sync from Instantly.ai
     * @param requestBody
     * @returns Message
     * @throws ApiError
     */
    public static emailAgentMessagesSyncEmailsCreate(
        requestBody: MessageRequest,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/messages/sync-emails/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List thread messages
     * Get all messages for a specific thread by its ID.
     * @param threadId ID of the conversation/thread to get messages for
     * @returns ThreadMessageList
     * @throws ApiError
     */
    public static emailMessageThreadList(
        threadId: number,
    ): CancelablePromise<ThreadMessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/messages/thread-messages/',
            query: {
                'thread_id': threadId,
            },
        });
    }
    /**
     * ViewSet for managing reply objectives.
     * @param page A page number within the paginated result set.
     * @returns PaginatedReplyObjectiveList
     * @throws ApiError
     */
    public static emailAgentObjectivesList(
        page?: number,
    ): CancelablePromise<PaginatedReplyObjectiveList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/objectives/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * ViewSet for managing reply objectives.
     * @param requestBody
     * @returns ReplyObjective
     * @throws ApiError
     */
    public static emailAgentObjectivesCreate(
        requestBody: ReplyObjectiveRequest,
    ): CancelablePromise<ReplyObjective> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/objectives/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing reply objectives.
     * @param id A unique integer value identifying this Reply objective.
     * @returns ReplyObjective
     * @throws ApiError
     */
    public static emailAgentObjectivesRetrieve(
        id: number,
    ): CancelablePromise<ReplyObjective> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/objectives/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for managing reply objectives.
     * @param id A unique integer value identifying this Reply objective.
     * @param requestBody
     * @returns ReplyObjective
     * @throws ApiError
     */
    public static emailAgentObjectivesUpdate(
        id: number,
        requestBody: ReplyObjectiveRequest,
    ): CancelablePromise<ReplyObjective> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/objectives/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing reply objectives.
     * @param id A unique integer value identifying this Reply objective.
     * @param requestBody
     * @returns ReplyObjective
     * @throws ApiError
     */
    public static emailAgentObjectivesPartialUpdate(
        id: number,
        requestBody?: PatchedReplyObjectiveRequest,
    ): CancelablePromise<ReplyObjective> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/objectives/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing reply objectives.
     * @param id A unique integer value identifying this Reply objective.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentObjectivesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/objectives/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Assign this objective to a campaign.
     * @param id A unique integer value identifying this Reply objective.
     * @param requestBody
     * @returns ReplyObjective
     * @throws ApiError
     */
    public static emailAgentObjectivesAssignToCampaignCreate(
        id: number,
        requestBody: ReplyObjectiveRequest,
    ): CancelablePromise<ReplyObjective> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/objectives/{id}/assign-to-campaign/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove this objective from a campaign.
     * @param id A unique integer value identifying this Reply objective.
     * @param requestBody
     * @returns ReplyObjective
     * @throws ApiError
     */
    public static emailAgentObjectivesRemoveFromCampaignCreate(
        id: number,
        requestBody: ReplyObjectiveRequest,
    ): CancelablePromise<ReplyObjective> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/objectives/{id}/remove-from-campaign/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param page A page number within the paginated result set.
     * @returns PaginatedReplyLogList
     * @throws ApiError
     */
    public static emailAgentReplylogsList(
        page?: number,
    ): CancelablePromise<PaginatedReplyLogList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/replylogs/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param requestBody
     * @returns ReplyLog
     * @throws ApiError
     */
    public static emailAgentReplylogsCreate(
        requestBody: ReplyLogRequest,
    ): CancelablePromise<ReplyLog> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/replylogs/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this reply log.
     * @returns ReplyLog
     * @throws ApiError
     */
    public static emailAgentReplylogsRetrieve(
        id: number,
    ): CancelablePromise<ReplyLog> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/replylogs/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this reply log.
     * @param requestBody
     * @returns ReplyLog
     * @throws ApiError
     */
    public static emailAgentReplylogsUpdate(
        id: number,
        requestBody: ReplyLogRequest,
    ): CancelablePromise<ReplyLog> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/replylogs/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this reply log.
     * @param requestBody
     * @returns ReplyLog
     * @throws ApiError
     */
    public static emailAgentReplylogsPartialUpdate(
        id: number,
        requestBody?: PatchedReplyLogRequest,
    ): CancelablePromise<ReplyLog> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/replylogs/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery.
     * Use this as your base class instead of viewsets.ModelViewSet.
     * @param id A unique integer value identifying this reply log.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentReplylogsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/replylogs/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Compute engagement metrics.
     * @returns ReplyLog
     * @throws ApiError
     */
    public static emailAgentReplylogsStatsRetrieve(): CancelablePromise<ReplyLog> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/replylogs/stats/',
        });
    }
    /**
     * ViewSet for managing user tags.
     * @param page A page number within the paginated result set.
     * @returns PaginatedTagList
     * @throws ApiError
     */
    public static emailAgentTagsList(
        page?: number,
    ): CancelablePromise<PaginatedTagList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/tags/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * ViewSet for managing user tags.
     * @param requestBody
     * @returns TagCreate
     * @throws ApiError
     */
    public static emailAgentTagsCreate(
        requestBody: TagCreateRequest,
    ): CancelablePromise<TagCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/tags/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing user tags.
     * @param id A unique integer value identifying this Tag.
     * @returns Tag
     * @throws ApiError
     */
    public static emailAgentTagsRetrieve(
        id: number,
    ): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/tags/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for managing user tags.
     * @param id A unique integer value identifying this Tag.
     * @param requestBody
     * @returns Tag
     * @throws ApiError
     */
    public static emailAgentTagsUpdate(
        id: number,
        requestBody: TagRequest,
    ): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/tags/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing user tags.
     * @param id A unique integer value identifying this Tag.
     * @param requestBody
     * @returns Tag
     * @throws ApiError
     */
    public static emailAgentTagsPartialUpdate(
        id: number,
        requestBody?: PatchedTagRequest,
    ): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/tags/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Prevent deletion of system tags.
     * @param id A unique integer value identifying this Tag.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentTagsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/tags/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create default system tags for the user.
     * @param requestBody
     * @returns Tag
     * @throws ApiError
     */
    public static emailAgentTagsCreateSystemTagsCreate(
        requestBody: TagRequest,
    ): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/tags/create-system-tags/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get tag usage statistics.
     * @returns Tag
     * @throws ApiError
     */
    public static emailAgentTagsStatsRetrieve(): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/tags/stats/',
        });
    }
    /**
     * List email conversations
     * List all email conversations/threads. Response includes metadata about background sync status.
     * @returns ConversationListResponse
     * @throws ApiError
     */
    public static emailAgentThreadsList(): CancelablePromise<Array<ConversationListResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param requestBody
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsCreate(
        requestBody: ConversationRequest,
    ): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this conversation.
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsRetrieve(
        id: number,
    ): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsUpdate(
        id: number,
        requestBody: ConversationRequest,
    ): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/email-agent/threads/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsPartialUpdate(
        id: number,
        requestBody?: PatchedConversationRequest,
    ): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/threads/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Base ModelViewSet with smart serializer discovery and user ownership filtering.
     * Use this for ViewSets where objects belong to users.
     * @param id A unique integer value identifying this conversation.
     * @returns void
     * @throws ApiError
     */
    public static emailAgentThreadsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/email-agent/threads/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Add tags to conversation
     * Add tags to a conversation. Creates new tags if they don't exist.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns ConversationTagResponse
     * @throws ApiError
     */
    public static conversationAddTags(
        id: number,
        requestBody: ConversationTagRequestRequest,
    ): CancelablePromise<ConversationTagResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/add-tags/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Archive/unarchive conversation
     * Archive or unarchive a conversation based on the archive parameter.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns ConversationArchiveResponse
     * @throws ApiError
     */
    public static conversationArchive(
        id: number,
        requestBody: ConversationArchiveRequest,
    ): CancelablePromise<ConversationArchiveResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/archive/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Manage automated replies
     * Enable or disable automated replies for a conversation.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns ConversationAutomatedReplyResponse
     * @throws ApiError
     */
    public static conversationAutomatedReplies(
        id: number,
        requestBody: ConversationAutomatedReplyRequest,
    ): CancelablePromise<ConversationAutomatedReplyResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/automated-replies/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get automated reply schedule
     * Get the automated reply schedule for a conversation.
     * @param id A unique integer value identifying this conversation.
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static conversationGetAutomatedSchedule(
        id: number,
    ): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/{id}/automated-schedule/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update automated reply schedule
     * Update the automated reply schedule for a conversation.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns AutomatedReplySchedule
     * @throws ApiError
     */
    public static conversationUpdateAutomatedSchedule(
        id: number,
        requestBody?: PatchedAutomatedReplyScheduleUpdateRequest,
    ): CancelablePromise<AutomatedReplySchedule> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/email-agent/threads/{id}/automated-schedule/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List draft messages
     * List all draft messages for this conversation thread.
     * @param id A unique integer value identifying this conversation.
     * @returns ConversationDraftListResponse
     * @throws ApiError
     */
    public static conversationListDrafts(
        id: number,
    ): CancelablePromise<ConversationDraftListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/{id}/drafts/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get draft message
     * Get a specific draft message by ID for this conversation thread.
     * @param draftId
     * @param id A unique integer value identifying this conversation.
     * @returns ConversationDraftDetailResponse
     * @throws ApiError
     */
    public static conversationGetDraft(
        draftId: string,
        id: number,
    ): CancelablePromise<ConversationDraftDetailResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/{id}/drafts/{draftId}/',
            path: {
                'draftId': draftId,
                'id': id,
            },
        });
    }
    /**
     * Get messages in conversation
     * Retrieve all messages for this conversation/thread.
     * @param id A unique integer value identifying this conversation.
     * @returns ThreadMessageList
     * @throws ApiError
     */
    public static conversationMessages(
        id: number,
    ): CancelablePromise<ThreadMessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/{id}/messages/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Pause automated replies
     * Pause automated replies for a conversation.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static conversationPauseAutomatedReplies(
        id: number,
        requestBody?: Record<string, any>,
    ): CancelablePromise<{
        message?: string;
        schedule?: AutomatedReplySchedule;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/pause-automated-replies/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'type',
        });
    }
    /**
     * Remove tags from conversation
     * Remove tags from a conversation by tag names.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns ConversationTagRemoveResponse
     * @throws ApiError
     */
    public static conversationRemoveTags(
        id: number,
        requestBody: ConversationTagRemoveRequestRequest,
    ): CancelablePromise<ConversationTagRemoveResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/remove-tags/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Resume automated replies
     * Resume automated replies for a conversation.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static conversationResumeAutomatedReplies(
        id: number,
        requestBody: ConversationRequest,
    ): CancelablePromise<{
        message?: string;
        schedule?: AutomatedReplySchedule;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/resume-automated-replies/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Send message in conversation
     * Send an outgoing message within this conversation.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static conversationSendMessage(
        id: number,
        requestBody: ThreadMessageSendRequest,
    ): CancelablePromise<{
        status?: string;
        message_id?: number;
        thread_id?: number;
        reply_log_id?: number | null;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/send/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Generate AI-suggested reply
     * Generate an AI-suggested reply for this conversation thread based on conversation history and optional objective.
     * @param id A unique integer value identifying this conversation.
     * @returns ConversationAIReplyResponse
     * @throws ApiError
     */
    public static conversationSuggestAiReply(
        id: number,
    ): CancelablePromise<ConversationAIReplyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/{id}/suggest-ai-reply/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Generate AI-suggested reply draft
     * Generate an AI-suggested reply and save it to the conversation's ai_response_draft field.
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns ConversationAISuggestResponse
     * @throws ApiError
     */
    public static conversationSuggestReply(
        id: number,
        requestBody?: ConversationAISuggestRequestRequest,
    ): CancelablePromise<ConversationAISuggestResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/suggest-reply/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Toggle conversation archive status
     * Toggle the archive status of a conversation (archived becomes unarchived and vice versa).
     * @param id A unique integer value identifying this conversation.
     * @param requestBody
     * @returns ConversationToggleArchiveResponse
     * @throws ApiError
     */
    public static conversationToggleArchive(
        id: number,
        requestBody: ConversationRequest,
    ): CancelablePromise<ConversationToggleArchiveResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/{id}/toggle-archive/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Trigger a deep sync to fetch ALL historical emails from Instantly.ai
     * @param requestBody
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsDeepSyncEmailsCreate(
        requestBody: ConversationRequest,
    ): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/deep-sync-emails/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Manually trigger background email sync from Instantly.ai
     * @param requestBody
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsSyncEmailsCreate(
        requestBody: ConversationRequest,
    ): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/threads/sync-emails/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Check the current sync status for the user
     * @returns Conversation
     * @throws ApiError
     */
    public static emailAgentThreadsSyncStatusRetrieve(): CancelablePromise<Conversation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/sync-status/',
        });
    }
    /**
     * List thread messages
     * Get all messages for a specific thread by its ID.
     * @param threadId ID of the conversation/thread to get messages for
     * @returns ThreadMessageList
     * @throws ApiError
     */
    public static emailAgentThreadMessages(
        threadId: number,
    ): CancelablePromise<ThreadMessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-agent/threads/thread-messages/',
            query: {
                'thread_id': threadId,
            },
        });
    }
    /**
     * Generic webhook endpoint for email provider notifications.
     * @returns any No response body
     * @throws ApiError
     */
    public static emailAgentWebhookCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/email-agent/webhook/',
        });
    }
}
