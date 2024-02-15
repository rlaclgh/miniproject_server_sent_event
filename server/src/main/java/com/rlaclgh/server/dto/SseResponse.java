package com.rlaclgh.server.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class SseResponse {


  @NonNull
  private String id;

  @NonNull
  private String message;

}
