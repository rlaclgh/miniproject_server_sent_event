package com.rlaclgh.server.sse;


import com.rlaclgh.server.dto.SseResponse;
import com.rlaclgh.server.util.NameGenerator;
import java.io.IOException;
import java.time.LocalTime;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
public class SseController {


  @Autowired
  private SseEmitterManager sseEmitterManager;


  @GetMapping(path = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public SseEmitter handle(
      @RequestParam String userId
  ) throws IOException {

    System.out.println(userId);
    SseEmitter emitter = new SseEmitter((long) (1000 * 60 * 5));

    Map<String, SseEmitter> sseEmitterMap = sseEmitterManager.getSseEmitterMap();

    sseEmitterMap.put(userId, emitter);

    emitter.onCompletion(() -> {
     sseEmitterMap.remove(userId);

    });
    emitter.onTimeout(() -> {
     sseEmitterMap.remove(userId);
    });

    return emitter;

  }



  @PostMapping("/events")
  public void sendEvent(
      @RequestParam String userId,
      @RequestParam String questionId
  ) {

    Map<String, SseEmitter> sseEmitterMap = sseEmitterManager.getSseEmitterMap();
    SseEmitter emitter = sseEmitterMap.get(userId);

    Thread thread = new Thread(() -> {
      try {
        for (int i = 0; i < 20; i++) {

          String message = NameGenerator.generateRandomPhrase();

          emitter.send(new SseResponse(questionId,message));
          Thread.sleep(100); // 0.1초 대기
        }
        emitter.complete(); // 데이터 전송 완료
      } catch (IOException | InterruptedException e) {
        emitter.completeWithError(e); // 데이터 전송 중 오류 발생 시 처리
      }
    });
    thread.start();
  }
}
