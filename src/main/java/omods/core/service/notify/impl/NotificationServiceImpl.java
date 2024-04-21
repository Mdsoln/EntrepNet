package omods.core.service.notify.impl;

import ClickSend.Api.SmsApi;
import ClickSend.ApiClient;
import ClickSend.ApiException;
import ClickSend.Model.SmsMessage;
import ClickSend.Model.SmsMessageCollection;
import lombok.RequiredArgsConstructor;
import omods.core.service.notify.base.Notification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements Notification {
     private final ApiClient apiClient;

    @Override
    public ResponseEntity<String> sendPassword(String newPassword, String mobile) throws ApiException {
        SmsApi smsApi = new SmsApi(apiClient);

        SmsMessage smsMessage = new SmsMessage();
        smsMessage.body("Your new password: "+newPassword);
        smsMessage.from("EntrepNet");
        smsMessage.to(mobile);
        smsMessage.source("Spring Boot Application");

        List<SmsMessage> smsMessageList = List.of(smsMessage);

        // SmsMessageCollection | SmsMessageCollection model
        SmsMessageCollection smsMessages = new SmsMessageCollection();
        smsMessages.messages(smsMessageList);

        try {
            String result = smsApi.smsSendPost(smsMessages);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ApiException e) {
            throw new ApiException(e);

        }
    }
}
